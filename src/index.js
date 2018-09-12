import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './store';

import App from './App';

import { injectGlobal } from 'styled-components';

injectGlobal`
  html, body {
    width: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Roboto';
    color: #4A4A4A;
    font-size: 14px;
  }
  * {
      box-sizing: border-box;
  }
`

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root'));
