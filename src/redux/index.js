import { createStore } from 'redux';
import persistState from 'redux-localstorage';
import reducers from './modules';

export default () => createStore(
  reducers,
  persistState(null, { key: 'ku-react-time-tracker' }),
);
