import { SET_WINE_FAMILIES } from './wineFamilies.types';

export const setWineFamilies = wineFamilies => ({
  type: SET_WINE_FAMILIES,
  payload: {
    wineFamilies
  }
});

export const getWineFamilies = wineModel => async (
  dispatch,
  _,
  { getWineFamilies }
) => {
  try {
    const wineFamilies = await getWineFamilies(wineModel);
    dispatch(setWineFamilies(wineFamilies));
  } catch (error) {
    console.error(error);
  }
};
