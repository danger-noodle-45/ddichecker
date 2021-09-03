import { combineReducers } from 'redux';
import medsReducer from './medsReducer';

const reducers = combineReducers({
  meds: medsReducer,
});

export default reducers;