from src.http_clients import CoinMarketCupClient
from src.config import settings

CMC_client = CoinMarketCupClient(
    base_url="https://pro-api.coinmarketcap.com/",
    api_key=settings.CMC_API_KEY
)