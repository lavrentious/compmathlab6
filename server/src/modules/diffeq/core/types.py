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


class DiffEqMethod(Enum):
    EULER = "EULER"
