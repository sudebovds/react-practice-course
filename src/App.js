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
          course: ''
        },
        CHF: {
          name: 'Швейцарский франк', 
          flag: CHF, 
          course: ''
        },
        CNY: {
          name: 'Китайский юань', 
          flag: CNY, 
          course: ''
        },
        GBP: {
          name: 'Фунт стерлингов', 
          flag: GPB, 
          course: ''
        },
        JPY: {
          name: 'Японская йена', 
          flag: JPY, 
          course: ''
        },
        RUB: {
          name: 'Российский рубль', 
          flag: RUB, 
          course: ''
        },
        EUR: {
          name: 'Евро', 
          flag: EUR, 
          course: ''
        }
      }
    }
  }

  componentDidMount(){
    fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
      .then((response) => response.json())
      .then((response) => {

        const rateArr = ['USD', 'CHF', 'CNY', 'GBP', 'JPY', 'RUB', 'EUR'];
        const currency = {...this.state.currency};

        for(let i = 0; i < rateArr.length; i++){
          currency[rateArr[i]].course = response.rates[rateArr[i]];
        };

        this.setState({
          rate: response.rates,
          date: response.date,
          currency
        });

      });
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
