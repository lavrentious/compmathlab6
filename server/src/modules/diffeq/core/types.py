from dataclasses import dataclass
from decimal import Decimal
from enum import Enum
from typing import List


@dataclass
class Point:
    x: Decimal
    y: Decimal


@dataclass
class DiffEqResult:
    points: List[Point]
    h: Decimal
    steps: int


class DiffEqMethod(Enum):
    EULER = "EULER"
    MOD_EULER = "MOD_EULER"
    RK4 = "RK4"
    ADAMS = "ADAMS"
