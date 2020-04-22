import {
  SELECT_BOX,
  UNSELECT_BOX,
  SELECT_CELL,
  UNSELECT_CELL,
  UPDATE_MODEL,
  RESET_ADD_WINE,
} from './adding.types';
import config from '~/config';
import { ModelType } from './adding.reducer';
const { WINE_TYPES, WINE_CATEGORIES } = config.wineTypes;
const { BOTTLE_TYPES } = config.bottleTypes;

export const selectBox = (boxId: number, cellId: number) =>
  <const>{
    type: SELECT_BOX,
    payload: {
      boxId,
      cellId,
    },
  };
export const unselectBox = (boxId: number) =>
  <const>{
    type: UNSELECT_BOX,
    payload: { boxId },
  };
export const selectCell = (boxId: number, cellId: number) =>
  <const>{
    type: SELECT_CELL,
    payload: { boxId, cellId },
  };
export const unselectCell = (boxId: number, cellId: number) =>
  <const>{
    type: UNSELECT_CELL,
    payload: { boxId, cellId },
  };

type UpdateModelData =
  | {
      readonly name: 'name';
      value: string;
    }
  | {
      readonly name: 'year';
      value: number;
    }
  | {
      readonly name: 'source';
      value: string;
    }
  | {
      readonly name: 'wineType';
      value: keyof typeof WINE_TYPES;
    }
  | {
      readonly name: 'wineCategory';
      value: keyof typeof WINE_CATEGORIES;
    }
  | {
      readonly name: 'bottleType';
      value: keyof typeof BOTTLE_TYPES;
    }
  | {
      readonly name: 'wineFamily';
      value: number;
    }
  | {
      readonly name: 'thumbnailFileName';
      value: string;
    }
  | {
      readonly name: 'pictureFileName';
      value: string;
    }
  | {
      readonly name: 'blur';
      value: string;
    }
  | {
      readonly name: 'positionComment';
      value: string;
    }
  | {
      readonly name: 'count';
      value: number;
    }
  | {
      readonly name: 'isInBoxes';
      value: boolean;
    };

export const updateModel = (data: UpdateModelData) =>
  <const>{
    type: UPDATE_MODEL,
    payload: data,
  };
export const resetAddWine = () =>
  <const>{
    type: RESET_ADD_WINE,
  };

export const toggleInBox = () => {
  return (dispatch, getState: () => { adding: { model: ModelType } }) => {
    dispatch(
      updateModel({
        name: 'isInBoxes',
        value: !getState().adding.model.isInBoxes,
      })
    );
  };
};

export const addWine = (wineModel) => async (dispatch, _, { addWine }) => {
  try {
    await addWine(wineModel);
    dispatch(resetAddWine());
    alert('Ajout avec succès');
  } catch (error) {
    console.error(error);
  }
};

export type AddingActions = ReturnType<
  | typeof selectBox
  | typeof unselectBox
  | typeof selectCell
  | typeof updateModel
  | typeof unselectCell
  | typeof resetAddWine
>;
