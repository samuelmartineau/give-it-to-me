import {
  SELECT_BOX_TO_BROWSE,
  UNSELECT_BOX_TO_BROWSE,
  SELECT_CELL_TO_BROWSE,
  UNSELECT_CELL_TO_BROWSE,
  SELECT_OUTSIDE_WINE_TO_BROWSE,
  UNSELECT_OUTSIDE_WINE_TO_BROWSE,
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

/** Browse a wine stored outside the boxes (it has no box nor cell). */
export const selectOutsideWineToBrowse = (wineId: number) =>
  <const>{
    type: SELECT_OUTSIDE_WINE_TO_BROWSE,
    payload: { wineId },
  };
export const unselectOutsideWineToBrowse = () =>
  <const>{
    type: UNSELECT_OUTSIDE_WINE_TO_BROWSE,
  };

export type BrowseActions = ReturnType<
  | typeof selectBoxToBrowse
  | typeof unselectBoxToBrowse
  | typeof selectCellToBrowse
  | typeof unselectCellToBrowse
  | typeof selectOutsideWineToBrowse
  | typeof unselectOutsideWineToBrowse
>;
