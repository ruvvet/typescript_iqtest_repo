import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';

// Check '/components/Main' for dev comments
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
