from decimal import Decimal
from typing import List

import sympy as sp  # type: ignore

from modules.diffeq.core.solvers.base import BaseSolver
from modules.diffeq.core.solvers.rk4 import RK4Solver
from modules.diffeq.core.types import DiffEqMethod, DiffEqResult, Point
from modules.diffeq.core.utils import compute_lambda


class AdamsSolver(BaseSolver):
    method = DiffEqMethod.ADAMS
    precision_order = 4

    def solve(self) -> DiffEqResult:
        aux_solver = RK4Solver(self.f, self.starting_point, self.h, min(self.steps, 3))

        aux_res = aux_solver.solve()
        points = aux_res.points
        fs: List[Decimal] = [compute_lambda(self.f, p.x, p.y) for p in points]
        for i in range(self.steps - 3):
            x, y = points[-1].x, points[-1].y
            f_i, f_im1, f_im2, f_im3 = fs[-1], fs[-2], fs[-3], fs[-4]

            # 1. predictor
            x_next = x + self.h
            y_next_star = y + (self.h / 24) * (
                55 * f_i - 59 * f_im1 + 37 * f_im2 - 9 * f_im3
            )

            # 2. corrector
            f_next_star = compute_lambda(self.f, x_next, y_next_star)
            y_new = y + (self.h / 24) * (9 * f_next_star + 19 * f_i - 5 * f_im1 + f_im2)

            points.append(Point(x_next, y_new))
            fs.append(f_next_star)

        return DiffEqResult(points=points, h=self.h, steps=self.steps)
