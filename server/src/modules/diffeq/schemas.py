from decimal import Decimal
from typing import List

import sympy as sp  # type: ignore
from pydantic import (
    BaseModel,
    ConfigDict,
    Field,
    RootModel,
    field_validator,
    model_validator,
)
from sympy.parsing.sympy_parser import parse_expr  # type: ignore

from config import FORMAT_STR
from modules.diffeq.core.types import DiffEqMethod, Point


class CustomBaseModel(BaseModel):
    model_config = ConfigDict(json_encoders={Decimal: lambda v: FORMAT_STR.format(v)})


class PointDTO(CustomBaseModel):
    x: Decimal
    y: Decimal

    @field_validator("x", "y", mode="before")
    @classmethod
    def coerce_to_decimal(cls, value: str | float | Decimal) -> Decimal:
        try:
            return Decimal(value)
        except Exception:
            raise ValueError(
                "All coordinates must be floats or strings representing floats"
            )


class PointsListDTO(RootModel[List[PointDTO]], CustomBaseModel):
    @model_validator(mode="after")
    def xs_unique(self) -> "PointsListDTO":
        x_values = [p.x for p in self.root]
        if len(set(x_values)) != len(x_values):
            raise ValueError("All x values in points must be unique")
        return self


class DiffEqRequest(CustomBaseModel):
    method: DiffEqMethod
    f_expr: str
    h: Decimal  # step
    steps: int = Field(gt=0)
    starting_point: PointDTO

    @field_validator("h", mode="before")
    @classmethod
    def coerce_to_decimal(cls, value: str | float | Decimal) -> Decimal:
        try:
            return Decimal(value)
        except Exception:
            raise ValueError(
                "All coordinates must be floats or strings representing floats"
            )

    _sympy_expr: sp.Expr = None  # Private field for cached expr

    @field_validator("f_expr", mode="after")
    @classmethod
    def validate_expr(cls, v: str) -> str:
        """Validate that the string can be parsed as sympy expression"""
        try:
            expr: sp.Expr = parse_expr(v)
            symbols = {str(s) for s in expr.free_symbols}
            if len(symbols.union({"x", "y"})) > 2:
                raise ValueError("Too many variables")
            return v
        except Exception as e:
            raise ValueError(f"Invalid mathematical expression: {e}")

    @property
    def sympy_expr(self) -> sp.Expr:
        """Lazy-load and cache the sympy expression"""
        if self._sympy_expr is None:
            self._sympy_expr = parse_expr(self.f_expr)
        return self._sympy_expr

    def to_lambda(self) -> sp.Lambda:
        """Convert to numerical function when needed"""
        x, y = sp.symbols("x y")
        return sp.Lambda((x, y), self.sympy_expr)


class DiffEqData(CustomBaseModel):
    points: PointsListDTO


class DiffEqResponse(CustomBaseModel):
    method: DiffEqMethod
    success: bool
    message: str | None = None
    data: DiffEqData | None
    time_ms: float
