import {combineReducers} from 'redux'

import cellar from './cellar'
import upload from './upload'
import notification from './notification'
import favorite from './favorite'

const rootReducer = combineReducers({cellar, upload, notification, favorite})

export default rootReducer
