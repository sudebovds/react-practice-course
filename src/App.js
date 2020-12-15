import React from 'react';
import axios from 'axios';
import './App.scss';
import { RateContext } from './context/RateContext';
import Layout from './components/Layout/Layout';
import { Input } from './components/input/Input';

import CHF from './images/CHF.png';
import CNY from './images/CNY.png';
import EUR from './images/EUR.png';
import GPB from './images/GBP.png';
import JPY from './images/JPY.png';
import RUB from './images/RUB.png';
import USD from './images/USD.png';
import { Dark } from './components/dark/Dark';
import { Modal } from './components/modal/Modal';

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {

      formControls: {
        email: {
          value: '',
          type: 'email',
          label: 'Email',
          errorMessage: 'Type the right Email!',
          valid: false,
          touched: false,
          validation: {
            required: true,
            email: true
          }
        },
        password: {
          value: '',
          type: 'password',
          label: 'Password',
          errorMessage: 'Type the right password',
          valid: false,
          touched: false,
          validation: {
            required: true,
            minLength: 6
          }
        }
      },

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
      sampleList: '',

      //modal

      showModal: false
    }
  }

  modalShowHandler = () => {
    this.setState({showModal: true})
  }

  modalHideHandler = () => {
    this.setState({showModal: false})
  }


  validateControl(value, validation){
    if(!validation){
      return true
    }

    let isValid = true
      if(validation.required){
        isValid = value.trim() !== '' && isValid
      }

      if(validation.email){
        isValid = validateEmail(value) && isValid
      }

      if(validation.minLength){
        isValid = value.length >= validation.minLength && isValid
      }

      return isValid
  }

  onChangeHandler = (event, controlName) => {
    const formControls = {...this.state.formControls}

    const control = {...formControls[controlName]}
    
    control.value = event.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)
    
    formControls[controlName] = control
    
    this.setState({formControls})
  }

  renderInputs = () => {
    return Object.keys(this.state.formControls)
    .map((controlName, i)=>{
      const control = this.state.formControls[controlName]
      return(
        <Input 

          key = {controlName + i}
          type = {control.type}
          value = {control.value}
          valid = {control.valid}
          touched = {control.touched}
          label = {control.label}
          errorMessage = {control.errorMessage}
          shouldValidate = {true}
          onChange = {(event)=> this.onChangeHandler(event, controlName)}
        
        />
      )
    })
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
          sampleRemove: this.sampleRemove,
          renderInputs: this.renderInputs,
          modalShowHandler: this.modalShowHandler,
          modalHideHandler: this.modalHideHandler
          }}>

        <Dark 
          showModal = {this.state.showModal} 
          modalHideHandler = {this.modalHideHandler}
        />
        <Modal />
        <Layout />
      </RateContext.Provider>
    );
  }
}

export default App; 
