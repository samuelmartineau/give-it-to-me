import {
  SELECT_BOX_TO_BROWSE,
  UNSELECT_BOX_TO_BROWSE,
  SELECT_CELL_TO_BROWSE,
  UNSELECT_CELL_TO_BROWSE,
} from './browse.types';

export const selectBoxToBrowse = (boxId: number) =>
  <const>{
    type: SELECT_BOX_TO_BROWSE,
    payload: { boxId },
  };
export const unselectBoxToBrowse = (boxId: number) =>
  <const>{
    type: UNSELECT_BOX_TO_BROWSE,
    payload: { boxId },
  };
export const selectCellToBrowse = (cellId: number) =>
  <const>{
    type: SELECT_CELL_TO_BROWSE,
    payload: { cellId },
  };
export const unselectCellToBrowse = (cellId: number) =>
  <const>{
    type: UNSELECT_CELL_TO_BROWSE,
    payload: { cellId },
  };

export type BrowseActions = ReturnType<
  | typeof selectBoxToBrowse
  | typeof unselectBoxToBrowse
  | typeof selectCellToBrowse
  | typeof unselectCellToBrowse
>;
