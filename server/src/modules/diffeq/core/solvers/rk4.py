from typing import List

import sympy as sp  # type: ignore

from modules.diffeq.core.solvers.base import BaseSolver
from modules.diffeq.core.types import DiffEqMethod, DiffEqResult, Point
from modules.diffeq.core.utils import compute_lambda


class RK4Solver(BaseSolver):
    method = DiffEqMethod.RK4
    precision_order = 4

    def solve(self) -> DiffEqResult:
        points: List[Point] = [Point(self.starting_point.x, self.starting_point.y)]
        for i in range(self.steps):
            x, y = points[-1].x, points[-1].y
            k1 = compute_lambda(self.f, x, y)
            k2 = compute_lambda(self.f, x + self.h / 2, y + self.h / 2 * k1)
            k3 = compute_lambda(self.f, x + self.h / 2, y + self.h / 2 * k2)
            k4 = compute_lambda(self.f, x + self.h, y + self.h * k3)
            new_y = y + self.h / 6 * (k1 + 2 * k2 + 2 * k3 + k4)
            new_x = x + self.h
            points.append(Point(new_x, new_y))

        return DiffEqResult(points=points, h=self.h, steps=self.steps)
