from aiohttp import ClientSession

class HttpClient:
    def __init__(self, base_url: str, api_key):
        self._session = ClientSession(
            base_url=base_url,
            headers={
                'Accepts': 'application/json',
                'X-CMC_PRO_API_KEY': api_key,
            }
        )


class CoinMarketCupClient(HttpClient):
    async def get_listings(self):
        async with self._session.get("/v1/cryptocurrency/listings/latest") as responce:
            result = await responce.json()
            return result["data"]
        
    async def get_currency(self, currency_id: int):
        async with self._session.get(
            "v2/cryptocurrency/quotes/latest",
            params={"id": currency_id},
        ) as responce:
            result = await responce.json()
            return result["data"][str(currency_id)]