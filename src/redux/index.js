import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import persistState from 'redux-localstorage';
import reducers from './modules';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
)(createStore);

export default () => createStoreWithMiddleware(
  reducers,
  persistState(null, { key: 'ku-react-time-tracker' }),
);
