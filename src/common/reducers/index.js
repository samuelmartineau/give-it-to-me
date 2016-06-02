import {combineReducers} from 'redux';

import cellar from './cellar';
import upload from './upload';
import notification from './notification';

const rootReducer = combineReducers({
  cellar,
  upload,
  notification
});

export default rootReducer;
