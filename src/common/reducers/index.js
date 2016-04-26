import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import cellar from './cellar';

const rootReducer = combineReducers({
  cellar,
  formReducer
});

export default rootReducer;
