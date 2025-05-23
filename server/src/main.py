# set precision
import decimal

import mpmath  # type: ignore

import config

decimal.setcontext(decimal.Context(prec=config.PRECISION))
mpmath.mp.dps = config.PRECISION

# init fastapi
from fastapi import APIRouter, FastAPI
from fastapi.middleware.cors import CORSMiddleware

from modules.diffeq.router import diffeq_router

api_router = APIRouter(prefix="/api")
api_router.include_router(diffeq_router)

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)
