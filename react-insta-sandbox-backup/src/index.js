import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, Switch } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from './Redux/Store/store';
import App from './App';

ReactDOM.render(

  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Switch>
          <Provider store={store} ><App /></Provider>
        </Switch>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,

  document.getElementById('root')

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
