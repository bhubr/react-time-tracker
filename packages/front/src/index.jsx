import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import * as serviceWorker from './serviceWorker';
import configureStore from './configureStore';
import App from './App';
import './index.css';

axios.defaults.withCredentials = true;

const store = configureStore();

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root'),
);

serviceWorker.unregister();
