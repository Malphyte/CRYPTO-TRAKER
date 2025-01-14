from fastapi import FastAPI
from src.routers.CoinMarketCupRouter import cmc_router

app = FastAPI()

app.include_router(cmc_router)