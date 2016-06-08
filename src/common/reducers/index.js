import {combineReducers} from 'redux';

import cellar from './cellar';
import upload from './upload';
import notification from './notification';
import basket from './basket';

const rootReducer = combineReducers({
  cellar,
  upload,
  notification,
  basket
});

export default rootReducer;
