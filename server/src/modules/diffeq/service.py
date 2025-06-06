import time

from fastapi import HTTPException

from modules.diffeq.core.solvers.adams import AdamsSolver
from modules.diffeq.core.solvers.base import BaseSolver
from modules.diffeq.core.solvers.euler import EulerSolver
from modules.diffeq.core.solvers.mod_euler import ModEulerSolver
from modules.diffeq.core.solvers.rk4 import RK4Solver
from modules.diffeq.core.types import DiffEqMethod, Point
from modules.diffeq.schemas import (
    DiffEqData,
    DiffEqMeta,
    DiffEqRequest,
    DiffEqResponse,
    PointDTO,
    PointsListDTO,
)


class DiffEqService:
    async def solve(self, data: DiffEqRequest) -> DiffEqResponse:
        solver: BaseSolver | None = None
        fn = data.to_lambda()
        point = Point(data.starting_point.x, data.starting_point.y)
        if data.method == DiffEqMethod.EULER:
            solver = EulerSolver(fn, point, data.h, data.steps)
        elif data.method == DiffEqMethod.MOD_EULER:
            solver = ModEulerSolver(fn, point, data.h, data.steps)
        elif data.method == DiffEqMethod.RK4:
            solver = RK4Solver(fn, point, data.h, data.steps)
        elif data.method == DiffEqMethod.ADAMS:
            solver = AdamsSolver(fn, point, data.h, data.steps)

        if solver is None:
            raise HTTPException(500, "Method not implemented")

        try:
            start_time = time.perf_counter()
            if data.epsilon is None:
                res = solver.solve()
            else:
                res = solver.solve_rhunge(data.epsilon)
            res_data = DiffEqData(
                points=PointsListDTO(root=[PointDTO(x=p.x, y=p.y) for p in res.points])
            )
            res_meta = DiffEqMeta(h=res.h, steps=res.steps)
            return DiffEqResponse(
                method=solver.method,
                success=True,
                message=None,
                data=res_data,
                meta=res_meta,
                time_ms=(time.perf_counter() - start_time) * 1000,
            )
        except ValueError as e:
            return DiffEqResponse(
                method=data.method,
                success=False,
                message=str(e),
                data=None,
                meta=None,
                time_ms=0.0,
            )
