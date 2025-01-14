from fastapi import APIRouter
from src.init import CMC_client

cmc_router = APIRouter(prefix="/cmc_api")

@cmc_router.get("/cyrrencies")
async def get_cyrrencies():
    return await CMC_client.get_listings()

@cmc_router.get("/cyrrency/{currency_id}")
async def get_cyrrency(currency_id: int):
    return await CMC_client.get_currency(currency_id=currency_id)