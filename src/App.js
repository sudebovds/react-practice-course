import React from 'react';
import axios from 'axios';
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
import { Dark } from './components/dark/Dark';
import { Modal } from './components/modal/Modal';

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
      },

      //calculator

      inputValue: 100,
      currencyValue: 'USD',
      result: null,

      //smaple

      sample: {base1: 'USD', base2: 'RUB', date: '', cours: ''},
      sampleList: ''
    }
  }

  base1Handler = (event) => {
    this.setState({sample: {...this.state.sample, base1: event.target.value}})
  }
  
  base2Handler = (event) => {
    this.setState({sample: {...this.state.sample, base2: event.target.value}})
  }

  sampleDateHandler = (event) => {
    this.setState({sample: {...this.state.sample, date: event.target.value}})
  }

  dataWrite = async () => {
    await fetch(`https://api.exchangeratesapi.io/${this.state.sample.date}?base=${this.state.sample.base1}`)
      .then((response) => response.json())
      .then((response) => {
        this.setState({sample: {...this.state.sample, cours: response.rates[this.state.sample.base2]}})
      })

    await axios.post('https://rateapp-40e37-default-rtdb.europe-west1.firebasedatabase.app/sample.json', this.state.sample)
      .then((response) => {
        return('');
      });

    await axios.get('https://rateapp-40e37-default-rtdb.europe-west1.firebasedatabase.app/sample.json')
      .then((response) => {
        this.setState({
          sampleList: response.data
        })
      })
  }

  sampleRemove = async (id) => {
    let sampleList = {...this.state.sampleList};

    delete sampleList[id];

    this.setState({sampleList});

    await axios.delete(`https://rateapp-40e37-default-rtdb.europe-west1.firebasedatabase.app/sample/${id}.json`)
  }

  inputValueHandler = (event) => {
    this.setState({
      inputValue: event.target.value,
      result: null
      });
  }

  currencyValueHandler = (event) => {
    this.setState({
      currencyValue: event.target.value,
      result: null
    });
  }

  calculatorHandler = async (value) => {
    let result;

    await fetch(`https://api.exchangeratesapi.io/latest?base=RUB`)
      .then((response) => response.json())
      .then((response) => {
        result = response.rates[value] * this.state.inputValue;
      })

    this.setState({
      result
    });
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

      axios.get('https://rateapp-40e37-default-rtdb.europe-west1.firebasedatabase.app/sample.json')
      .then((response) => {
        this.setState({
          sampleList: response.data
        })
      })      
  }

  render(){
    

    return(
      <RateContext.Provider value = {{
          state: this.state, 
          inputValueHandler: this.inputValueHandler, 
          currencyValueHandler: this.currencyValueHandler,
          calculatorHandler: this.calculatorHandler,
          base1Handler: this.base1Handler,
          base2Handler: this.base2Handler,
          sampleDateHandler: this.sampleDateHandler,
          dataWrite: this.dataWrite,
          sampleRemove: this.sampleRemove
          }}>

        <Dark />
        <Modal />
        <Layout />
      </RateContext.Provider>
    );
  }
}

export default App; 
