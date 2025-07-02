import { configureStore } from '@reduxjs/toolkit';
import withRedux from 'next-redux-wrapper';
import reducer from './reducer';
import * as api from '../api';

export const makeStore = (preloadedState?: RootState) => {
  return configureStore({
    reducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: api,
        },
      }),
    devTools: process.env.NODE_ENV !== 'production',
  });
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
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
