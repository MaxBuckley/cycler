import { combineReducers } from 'redux';
import { user } from './user';

const REDUCERS = combineReducers({
  userState: user,
});

export default REDUCERS;
