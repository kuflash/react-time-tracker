import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './redux';
import App from './containers/App';
import './index.css';

const store = createStore();

ReactDOM.render(
  <Provider store={store} key='provider'>
    <App />
  </Provider>,
  document.getElementById('root'),
);
