import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

const app = <BrowserRouter>
    <React.StrictMode>
    <App />
  </React.StrictMode>
</BrowserRouter>

ReactDOM.render(
  app,
  document.getElementById('root')
);

reportWebVitals();
