from abc import abstractmethod
from decimal import Decimal

import sympy as sp  # type: ignore

from modules.diffeq.core.types import DiffEqMethod, DiffEqResult, Point


class BaseSolver:
    f: sp.Expr
    starting_point: Point
    h: Decimal
    steps: int

    def __init__(self, f: sp.Lambda, starting_point: Point, h: Decimal, steps: int):
        self.f = f
        self.starting_point = starting_point
        self.h = h
        self.steps = steps

    @property
    @abstractmethod
    def method(self) -> DiffEqMethod: ...

    @property
    @abstractmethod
    def precision_order(self) -> int: ...

    @abstractmethod
    def solve(self) -> DiffEqResult: ...

    def solve_rhunge(self, epsilon: Decimal) -> DiffEqResult:
        h = self.h
        n = self.steps

        solver_h = self.__class__(self.f, self.starting_point, h, n)
        result_h = solver_h.solve()

        solver_h2 = self.__class__(self.f, self.starting_point, h / 2, n * 2)
        result_h2 = solver_h2.solve()

        p = self.precision_order
        error = abs(result_h.points[-1].y - result_h2.points[-1].y) / (2**p - 1)

        if error <= epsilon:
            return result_h2
        else:
            print(f"error: {error}, running finer solver ({h=}, {n=})")
            solver_finer = self.__class__(self.f, self.starting_point, h / 2, n * 2)
            return solver_finer.solve_rhunge(epsilon)
