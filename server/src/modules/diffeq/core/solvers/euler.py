from typing import List

import sympy as sp  # type: ignore

from modules.diffeq.core.solvers.base import BaseSolver
from modules.diffeq.core.types import DiffEqMethod, DiffEqResult, Point
from modules.diffeq.core.utils import compute_lambda


class EulerSolver(BaseSolver):
    method = DiffEqMethod.EULER
    precision_order = 1

    def solve(self) -> DiffEqResult:
        points: List[Point] = [Point(self.starting_point.x, self.starting_point.y)]
        for i in range(self.steps):
            x, y = points[-1].x, points[-1].y
            new_x = x + self.h
            new_y = y + self.h * compute_lambda(self.f, x, y)
            points.append(Point(new_x, new_y))

        return DiffEqResult(points=points, h=self.h, steps=self.steps)
