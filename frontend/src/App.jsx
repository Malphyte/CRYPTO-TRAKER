import React, { useEffect } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu, Card } from 'antd';
import axios from 'axios';
import { useState } from 'react';



const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [currencyId, setCurrencyId] = useState(1);
  const [currencyData, setCurrencyData] = useState(null);

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
    })
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  useEffect(() => {
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
        <Card
          title={
            <div>
              <img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${currencyData.key}.png`}/>
              <span>{currencyData.name}</span>
            </div>}
          extra={<a href="#">More</a>}
          style={{
            width: 300,
          }}
        >
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </div>
    </div>
  );
};
export default App;