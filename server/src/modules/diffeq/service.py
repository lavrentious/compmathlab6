from fastapi import HTTPException

from modules.diffeq.core.solvers.base import BaseSolver
from modules.diffeq.core.solvers.euler import EulerSolver
from modules.diffeq.core.solvers.mod_euler import ModEulerSolver
from modules.diffeq.core.types import DiffEqMethod, Point
from modules.diffeq.schemas import (
    DiffEqData,
    DiffEqRequest,
    DiffEqResponse,
    PointDTO,
    PointsListDTO,
)


class DiffEqService:
    async def solve(self, data: DiffEqRequest) -> DiffEqResponse:
        print(f"{data=}")
        solver: BaseSolver | None = None
        fn = data.to_lambda()
        point = Point(data.starting_point.x, data.starting_point.y)
        if data.method == DiffEqMethod.EULER:
            solver = EulerSolver(fn, point, data.h, data.steps)
        elif data.method == DiffEqMethod.MOD_EULER:
            solver = ModEulerSolver(fn, point, data.h, data.steps)

        if solver is None:
            raise HTTPException(500, "Method not implemented")

        try:
            res = solver.solve()
            print(f"{res=}")
            res_data = DiffEqData(
                points=PointsListDTO(root=[PointDTO(x=p.x, y=p.y) for p in res.points])
            )
            return DiffEqResponse(
                method=data.method,
                success=True,
                message=None,
                data=res_data,
                time_ms=0.0,
            )
        except ValueError as e:
            return DiffEqResponse(
                method=data.method,
                success=False,
                message=str(e),
                data=None,
                time_ms=0.0,
            )
