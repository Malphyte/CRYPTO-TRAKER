import React, { useEffect } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu, Card, Spin } from 'antd';
import axios from 'axios';
import { useState } from 'react';

function toShortFormatNumber(number) {
  return number.toLocaleString('en-US', {
    maximumFractionDigits: 2,
    notation: 'compact',
    compactDisplay: 'short'
  });
}

const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [currencyId, setCurrencyId] = useState(1);
  const [currencyData, setCurrencyData] = useState(null);

  const ColoredPercentText = () => {
    if(currencyData){
      return currencyData.quote.USD.percent_change_24h>=0?
        <span className="text-lime-400">{currencyData.quote.USD.percent_change_24h.toFixed(2)}%</span>:
        <span className="text-red-600">{currencyData.quote.USD.percent_change_24h.toFixed(2)}%</span>
    } else {
      return "-";
    }
  }

  const fetchCurrencies = () => {
    axios.get("http://127.0.0.1:8000/cmc_api/cyrrencies").then(responce => {
      const currenciesResponce = responce.data;
      const items = [
        {
          key: 'g1',
          label: 'Криптовалюты',
          type: 'group',
          children: currenciesResponce.map(c => {
            return {key: c.id, label: c.name}
          }),
        },
      ];
      setCurrencies(items);
    })
  };

  const fetchCurrency = () => {
    axios.get(`http://127.0.0.1:8000/cmc_api/cyrrency/${currencyId}`).then(responce => {
      setCurrencyData(responce.data);
      console.log(responce.data);
    })
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  useEffect(() => {
    setCurrencyData(null);
    fetchCurrency();
  }, [currencyId]);

  const onClick = (e) => {
    setCurrencyId(e.key);
  };

  return (
    <div className='flex'>
      <Menu
      onClick={onClick}
      style={{
        width: 256,
      }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={currencies}
      className='h-screen overflow-scroll'
      />
      <div className='mx-auto my-auto'>
        {currencyData?<Card
          title={
            <div className="flex justify-start items-center gap-3 m-1 p-4">
              <img className=""
               src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${currencyId}.png`}/>
              <span>{currencyData?currencyData.name:"-"} ({currencyData?currencyData.symbol:"-"})</span>
            </div>}
          extra={<a href="#">More</a>}
          style={{
            width: 400,
          }}
        >
          <p>Price: {currencyData?currencyData.quote.USD.price.toFixed(2):"-"}$</p>
          <p>Percent Change 24h: <ColoredPercentText/></p>
          <p>Market Cap: {currencyData?toShortFormatNumber(currencyData.quote.USD.market_cap):"-"}</p>
        </Card>:<Spin size="large"/>}
      </div>
    </div>
  );
};
export default App;