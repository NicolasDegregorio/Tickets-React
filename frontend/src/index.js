import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import {Provider} from 'react-redux'
import generateStore from './redux/store'
import axios from 'axios'

const store = generateStore()

axios.defaults.baseURL = process.env.REACT_APP_AXIOS_URL;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

