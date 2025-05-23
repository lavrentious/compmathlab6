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

    @abstractmethod
    def solve(self) -> DiffEqResult: ...
