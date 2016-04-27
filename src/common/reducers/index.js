import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import cellar from './cellar';
import upload from './upload';

const rootReducer = combineReducers({
  cellar,
  upload,
  formReducer
});

export default rootReducer;
