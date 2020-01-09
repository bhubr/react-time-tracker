import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
// import registerServiceWorker from './registerServiceWorker'
import configureStore from './configureStore';
import App from './App';

axios.defaults.withCredentials = true;

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// registerServiceWorker()
