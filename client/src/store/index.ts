import { createStore, applyMiddleware, compose } from 'redux';
import withRedux from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';
import * as api from '../api';

type Compose = typeof compose;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: Compose;
  }
}

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const makeStore = (initialState: RootState) => {
  return createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunkMiddleware.withExtraArgument(api)))
  );
};

export const reduxPage = withRedux(makeStore);

export {
  setCellar,
  getCellar,
  selectBox,
  unselectBox,
  selectCell,
  unselectCell,
  updateModel,
  addWine,
  toggleCheckboxFilter,
  updateInputFilter,
  getNextHits,
  selectBottleToDelete,
  unselectBottleToDelete,
  removeBottles,
  getWineFamilies,
  addToFavorite,
  removeFromFavorite,
  toggleFavoritesFilter,
  selectBoxToBrowse,
  unselectBoxToBrowse,
  selectCellToBrowse,
  unselectCellToBrowse,
  createWineFamily,
  syncUrlParams,
  setRemoveCount,
  resetRemoveState,
  toggleOutsideBoxesFilter,
  removeOutsideBottles,
  selectWineToRemove,
  toggleInBox,
} from './actions';

export {
  getWineById,
  getCellsUsedInBox,
  getBottleById,
  getBottlesInBox,
  getSelectedCellsInBox,
  isCellSelected,
  isBoxSelected,
  getBottleByPosition,
  isBoxSelectable,
  isCellSelectable,
  isModelValid,
  getAddModel,
  isWineFiltered,
  getWinesFiltered,
  isWineInBox,
  getWineBottlesAsMap,
  getRemovedBottles,
  isBottleSelectedToBeRemoved,
  getWineBottles,
  isBoxBrowsed,
  isBoxBrowseable,
  getBrowsedWine,
  getFiltersCount,
} from './selectors';

export type RootState = ReturnType<typeof reducer>;
