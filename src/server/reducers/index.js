import {combineReducers} from 'redux';

import cellar from './cellar';
import upload from '../../common/reducers/upload';

const rootReducer = combineReducers({
  cellar,
  upload
});

export default rootReducer;
