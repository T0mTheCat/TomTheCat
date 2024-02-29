import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JsonView from 'react18-json-view'
import 'react18-json-view/src/style.css'
import 'react18-json-view/src/dark.css'
import { shortenPublicKey } from '../utils/helpers';
import logo from '../../public/images/logo3.png'; // replace with path to your logo
import banner from '../../public/images/banner.png'; // replace with path to your banner


import './index.css';


function mapData(data, addr) {
  let fData = [];
  let types = new Set();

  data.items.forEach((x) => {
    x.messages.forEach((msg) => {
      const item = { time: x.created, ...msg };
      if (JSON.stringify(item.detail).includes(addr)) {
        fData.push(item);
        types.add(item.type);
      }
    });
  });

  types = Array.from(types);

  return fData;
}


function App() {
  const [address, setAddress] = useState('sei1cnm35wr3grxgpssyffqtp4p9lazeyh6n222l4y');
  const [DATA, setDATA] = useState(null);
  const [nftCount, setNftCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [walletHistory, setWalletHistory] = useState([address]);

  useEffect(() => {
    getData();
  }, [address]); 

  const getData = async () => {
    await fetchData();
    await fetchPaletData();
  }

  const saveHistory = () => { 
    window.localStorage.setItem('walletHistory', JSON.stringify(walletHistory));
  }
  const loadHistory = () => { 
    const history = window.localStorage.getItem('walletHistory');
    if (history) {
      setWalletHistory(JSON.parse(history));
      setAddress(JSON.parse(history)[history.length - 1]);
    }
   }

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://celatone-api-prod.alleslabs.dev/v1/sei/pacific-1/accounts/${address}/txs?limit=100000&offset=0&is_wasm=true&is_move=false&is_initia=false&is_send=false&is_ibc=false&is_instantiate=false&is_store_code=false&is_execute=false&is_migrate=false&is_update_admin=false&is_clear_admin=false&is_move_publish=false&is_move_upgrade=false&is_move_execute=false&is_move_script=false&is_opinit=false`);
      const data = mapData(response.data, address);
      setDATA(data);

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchPaletData = async () => {
    try {

      const palletData = await axios.get(`https://api.pallet.exchange/api/v1/user/${address}?network=mainnet&include_estimated_value=true`, {timeout: 5000})
      if (palletData && palletData.data && (palletData.data.owned > 0)) {
        setNftCount(palletData.data.owned);
      }
    } catch (error) {
      console.error('Error fetching pallet data:', error);
    }
  };

  const openPalet = () => {
    const url = `https://pallet.exchange/profile/${address}`;
    window.open(url, '_blank');
  }

  const customizeCopy = async (copy, index) => {
    if (copy) {
      if (copy.slice(0, 3) === 'sei') {
        let newHistory = [...walletHistory, copy];
        if (index || index === 0) {
          newHistory = walletHistory.slice(0, index + 1);
        }
        await setAddress(copy);
        await setWalletHistory(newHistory);

      }
    }
  }
  

  return (
    <div className="App">
      <header>
        <img src={logo} alt="Logo" />
      </header>
      <hr />
      <div className="wallet" style={{display: 'flex'}}>
        <div className="input">
          <input 
          type="text" 
          placeholder="Wallet Address" 
          value={address} 
          onChange={e => setAddress(e.target.value)} 
        />
          </div>
        <button onClick={() => {getData(); setWalletHistory([address])}}>Fetch Data</button>
      </div>

      <div className="pallet" style={{display: 'flex'}}>
        <h2 style={{ margin: '0px', width: '500px' }}>NFT Count: { nftCount }</h2>
        <button onClick={openPalet}>Pallet</button>
      </div>

      <div style={{ display: 'flex' }}>
        { isLoading 
        ? (<div style={{ width: '78vw', paddingRight: '2vw' }}>Loading...</div>) 
        : (
            <div style={{ width: '78vw', paddingRight: '2vw' }}>
            <h2>Transaction Count: { DATA?.length }</h2>
              <ul style={{listStyleType: 'none'}}>
                {DATA && DATA.map((x, i) => (
                  <li key={i}>
                    {x.time}
                    <JsonView dark customizeCopy={ customizeCopy } theme={ 'default' } src={ x.detail } />
                  </li>
                ))}
              </ul>
              </div>

          ) }
          <div>
            <div style={{ }}>

              <h2 style={{margin: '0px', padding: '0px', marginTop: '5px'}}>History </h2>
              <div style={{ display: 'flex'}}>
                <button onClick={ saveHistory }>Save History</button>
                <button onClick={ loadHistory }>Load History</button>
              </div>
            </div>
            <ul style={{listStyleType: 'none'}}>
              {walletHistory && walletHistory.map((x, i) => (
                <li key={i}> <a onClick={ () => customizeCopy(x, i) }>{x}</a></li>
              ))}
            </ul>
          </div>
        </div>
    </div>
  );
}

export default App;
