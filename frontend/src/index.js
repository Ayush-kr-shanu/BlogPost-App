import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import ChakraUIProvider from './chakraProvider';

ReactDOM.render(
  <React.StrictMode>
    <ChakraUIProvider>
      <App />
    </ChakraUIProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
