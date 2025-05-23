from typing import List
from modules.diffeq.core.solvers.base import BaseSolver
from modules.diffeq.core.types import DiffEqMethod, DiffEqResult, Point
from modules.diffeq.core.utils import compute_lambda, to_sp_float
import sympy as sp  # type: ignore


class ModEulerSolver(BaseSolver):
    method = DiffEqMethod.MOD_EULER

    def solve(self) -> DiffEqResult:
        points: List[Point] = [Point(self.starting_point.x, self.starting_point.y)]
        for i in range(self.steps):
            x, y = points[-1].x, points[-1].y
            new_y_star = y + self.h * compute_lambda(self.f, x, y)

            new_x = x + self.h
            new_y = y + self.h / 2 * (
                compute_lambda(self.f, x, y) + compute_lambda(self.f, new_x, new_y_star)
            )
            points.append(Point(new_x, new_y))
        return DiffEqResult(points=points)
