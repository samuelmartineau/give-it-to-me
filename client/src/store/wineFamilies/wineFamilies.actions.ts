import { SET_WINE_FAMILIES, SET_WINE_FAMILY } from './wineFamilies.types';
import { WineFamilyType } from '@/Cellar.type';

export const setWineFamilies = (wineFamilies: WineFamilyType[]) =>
  <const>{
    type: SET_WINE_FAMILIES,
    payload: {
      wineFamilies,
    },
  };

export const setWineFamily = (wineFamily: WineFamilyType) =>
  <const>{
    type: SET_WINE_FAMILY,
    payload: {
      wineFamily,
    },
  };

export const getWineFamilies = () => async (
  dispatch,
  _,
  { getWineFamilies }
) => {
  try {
    const wineFamilies = await getWineFamilies();
    dispatch(setWineFamilies(wineFamilies));
  } catch (error) {
    console.error(error);
  }
};

export const createWineFamily = (name) => async (
  dispatch,
  _,
  { createWineFamily }
) => {
  try {
    const wineFamily = await createWineFamily(name);
    dispatch(setWineFamily(wineFamily));
  } catch (error) {
    console.error(error);
  }
};

export type WineFamiliesActions = ReturnType<
  typeof setWineFamilies | typeof setWineFamily
>;
