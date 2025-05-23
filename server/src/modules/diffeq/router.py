from fastapi import APIRouter

from modules.diffeq.schemas import DiffEqRequest, DiffEqResponse
from modules.diffeq.service import DiffEqService

diffeq_router = APIRouter(prefix="/diffeq", tags=["Differential Equations"])


@diffeq_router.post("/", response_model=DiffEqResponse)
async def interpolate(data: DiffEqRequest) -> DiffEqResponse:
    service = DiffEqService()
    return await service.solve(data)
