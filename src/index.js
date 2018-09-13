import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './store';

import App from './App';
import osloCentralStation from './images/oslo-central.jpg';

import { injectGlobal } from 'styled-components';

injectGlobal`
  html, body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto';    
    font-size: 14px;
    @media(min-width: 1024px) {
        background-image: url(${osloCentralStation});
        background-position: 420px 0;
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size: cover;
    } 
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
