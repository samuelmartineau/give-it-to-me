import { combineReducers } from 'redux';
import { CELLAR_RECEIVED } from '../wines/wines.types';
import config from '~/config';
import { WinesActions } from '@/store/wines/wines.actions';
import { EnhancedBottleType, CellarType } from '@/Cellar.type';

export const enhanceBottle = (bottle, wineId, wineType) => ({
  ...bottle,
  wine_id: wineId,
  color:
    bottle.deleted === 1
      ? 'black'
      : config.wineTypes.WINE_TYPES[wineType].color,
});

function getBottles(wines: CellarType) {
  return wines.reduce<EnhancedBottleType[]>(
    (acc, wine) =>
      acc.concat(
        wine.bottles.map((bottle) =>
          enhanceBottle(bottle, wine.id, wine.wineType),
        ),
      ),
    [],
  );
}

export type MapType = {
  [id: number]: EnhancedBottleType;
};

export const mapReducer = (state: MapType = {}, action: WinesActions) => {
  switch (action.type) {
    case CELLAR_RECEIVED: {
      const { cellar } = action.payload;
      return getBottles(cellar).reduce(
        (acc, bottle) =>
          Object.assign(acc, {
            [bottle.id]: bottle,
          }),
        {},
      );
    }
    default:
      return state;
  }
};

export type AllType = EnhancedBottleType[];

export const allReducer = (state: AllType = [], action: WinesActions) => {
  switch (action.type) {
    case CELLAR_RECEIVED: {
      const { cellar } = action.payload;

      return getBottles(cellar);
    }
    default:
      return state;
  }
};

export type CellsType = {
  [boxId: number]: {
    [cellId: number]: EnhancedBottleType;
  };
};

export const cellsReducer = (state: CellsType = {}, action: WinesActions) => {
  switch (action.type) {
    case CELLAR_RECEIVED: {
      const { cellar } = action.payload;

      return getBottles(cellar).reduce((acc, bottle) => {
        if (!acc[bottle.box]) {
          acc[bottle.box] = {};
        }
        Object.assign(acc[bottle.box], {
          ...acc[bottle.box],
          [bottle.cell]: bottle,
        });
        return acc;
      }, {});
    }
    default:
      return state;
  }
};

const reducer = combineReducers({
  map: mapReducer,
  cells: cellsReducer,
  all: allReducer,
});

export default reducer;
