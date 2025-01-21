import axios from 'axios';
import { Descriptions, Button, Spin } from 'antd';
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function toShortFormatNumber(number) {
    return number.toLocaleString('en-US', {
      maximumFractionDigits: 2,
      notation: 'compact',
      compactDisplay: 'short'
    });
  }

const CryptoPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [ currencyData, setCurrencyData ] = useState(null);
    const [ tableData, setTableData ] = useState([]);

    const fetchCurrency = () => {
        axios.get(`http://127.0.0.1:8000/cmc_api/cyrrency/${params.cryptoId}`).then(responce => {
            setCurrencyData(responce.data);
        })
    };

    const updateTable = () => {
        if(currencyData) {
            const usd = currencyData.quote.USD;
            const data = [
                {
                    key: '1',
                    label: 'Symbol',
                    children: currencyData.symbol,
                },
                {
                    key: '2',
                    label: 'Slug',
                    children: currencyData.slug,
                },
                {
                    key: '3',
                    label: 'Date Added',
                    children: new Date(currencyData.date_added).toLocaleDateString(),
                },
                {
                    key: '4',
                    label: 'Max Supply',
                    children: currencyData.max_supply?
                            <>{toShortFormatNumber(currencyData.max_supply)}$</>:
                            "-",
                },
                {
                    key: '5',
                    label: 'Total Supply',
                    children: <>{toShortFormatNumber(currencyData.total_supply)}$</>,
                },
                {
                    key: '6',
                    label: 'Price',
                    children: <>{usd.price?usd.price.toFixed(2):"-"}$</>,
                },
                {
                    key: '7',
                    label: 'Dayly Percent Change',
                    children: usd.percent_change_24h>=0?
                        <span className="text-lime-400">↗ {usd.percent_change_24h.toFixed(2)}%</span>:
                        <span className="text-red-600">↙ {usd.percent_change_24h.toFixed(2)}%</span>,
                },
                {
                    key: '8',
                    label: 'Monthly Percent Change',
                    children: usd.percent_change_30d>=0?
                                <span className="text-lime-400">↗ {usd.percent_change_30d.toFixed(2)}%</span>:
                                <span className="text-red-600">↙ {usd.percent_change_30d.toFixed(2)}%</span>,
                },
            ];
            setTableData(data);
        }
    };

    useEffect(()=> {
        fetchCurrency();
    }, []);

    useEffect(() => {
        updateTable();
    }, [currencyData]);

    return <>
        <Descriptions
            bordered
            column={1}
            title={
                <div className="flex justify-start items-center gap-3 m-1 p-4">
                    <img className=""
                    src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${params.cryptoId}.png`}/>
                    <span>{currencyData?currencyData.name:"-"} ({currencyData?currencyData.symbol:"-"})</span>
                </div>
            }
            size="default"
            extra={<Button type="primary" onClick={() => navigate(-1)}>Go Back</Button>}
            items={tableData}
        />
    </>
};
export default CryptoPage;