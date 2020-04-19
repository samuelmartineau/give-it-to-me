import { combineReducers } from 'redux';
import { CELLAR_RECEIVED } from '../wines/wines.types';
import { wineTypes } from '~/config';
import { WinesActions } from '~/client/store/wines/wines.actions';
import { BottleType, CellarType } from '~/client/components/Wine/Wine.type';

function getBottles(wines: CellarType) {
  return wines.reduce<({ wine_id: number; color: string } & BottleType)[]>(
    (acc, wine) =>
      acc.concat(
        wine.bottles.map((bottle) => ({
          wine_id: wine.id,
          ...bottle,
          color: wineTypes.WINE_TYPES[wine.wineType].color,
        }))
      ),
    []
  );
}

type MapType = {
  [id: number]: BottleType;
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
        {}
      );
    }
    default:
      return state;
  }
};
export const allReducer = (state: BottleType[] = [], action: WinesActions) => {
  switch (action.type) {
    case CELLAR_RECEIVED: {
      const { cellar } = action.payload;

      return getBottles(cellar);
    }
    default:
      return state;
  }
};

type CellsType = {
  [boxId: number]: {
    [cellId: number]: BottleType;
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
