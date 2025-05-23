from decimal import Decimal

import sympy as sp  # type: ignore

from config import PRECISION


def to_sp_float(x: Decimal | int | float | sp.Float) -> sp.Float:
    return sp.Float(str(x), PRECISION)


def compute_lambda(
    f: sp.Lambda,
    x: Decimal | sp.Float | float | int | str,
    y: Decimal | sp.Float | float | int | str,
) -> Decimal:
    _x, _y = sp.symbols("x y")
    return Decimal(
        str(f(_x, _y).subs({_x: to_sp_float(x), _y: to_sp_float(y)}).evalf(PRECISION))
    )
