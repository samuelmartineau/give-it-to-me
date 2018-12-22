import { combineReducers } from 'redux';
import winesReducer from './wines/wines.reducer';
import bottlesReducer from './bottles/bottles.reducer';
import addingReducer from './adding/adding.reducer';
import searchReducer from './search/search.reducer';
import removeReducer from './remove/remove.reducer';
import wineFamiliesReducer from './wineFamilies/wineFamilies.reducer';
import favoritesReducer from './favorites/favorites.reducer';

export default combineReducers({
  wines: winesReducer,
  bottles: bottlesReducer,
  adding: addingReducer,
  search: searchReducer,
  remove: removeReducer,
  wineFamilies: wineFamiliesReducer,
  favorites: favoritesReducer
});
