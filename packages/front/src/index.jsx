import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
// import registerServiceWorker from './registerServiceWorker'
import configureStore from './configureStore';
import App from './App';

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

// registerServiceWorker()
