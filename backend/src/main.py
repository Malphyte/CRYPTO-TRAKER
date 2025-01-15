from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routers.CoinMarketCupRouter import cmc_router

app = FastAPI()
app.include_router(cmc_router)

origins = [
    "http://127.0.0.1:5173",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
