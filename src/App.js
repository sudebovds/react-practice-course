import React from 'react';
import './App.scss';
import { RateContext } from './context/RateContext';
import Layout from './components/Layout/Layout';

import CHF from './images/CHF.png';
import CNY from './images/CNY.png';
import EUR from './images/EUR.png';
import GPB from './images/GBP.png';
import JPY from './images/JPY.png';
import RUB from './images/RUB.png';
import USD from './images/USD.png';

class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      base: 'USD',
      rate: '',
      date: '',
      currency: {
        USD: {
          name: 'Доллар США', 
          flag: USD, 
          course: '9999'
        },
        CHF: {
          name: 'Швейцарский франк', 
          flag: CHF, 
          course: '9999'
        },
        CNY: {
          name: 'Китайский юань', 
          flag: CNY, 
          course: '9999'
        },
        GPB: {
          name: 'Фунт стерлингов', 
          flag: GPB, 
          course: '9999'
        },
        JPY: {
          name: 'Японская йена', 
          flag: JPY, 
          course: '9999'
        },
        RUB: {
          name: 'Российский рубль', 
          flag: RUB, 
          course: '9999'
        },
        EUR: {
          name: 'Евро', 
          flag: EUR, 
          course: '9999'
        }
      }
    }
  }
  render(){
    

    return(
      <RateContext.Provider value = {{state: this.state}}>
        <Layout />
      </RateContext.Provider>
    );
  }
}

export default App; 
