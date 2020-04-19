export const addToFavorite = (wineId) => async (
  dispatch,
  _,
  { addToFavorite }
) => {
  try {
    await addToFavorite(wineId);
  } catch (error) {
    console.error(error);
  }
};

export const removeFromFavorite = (wineId) => async (
  dispatch,
  _,
  { removeFromFavorite }
) => {
  try {
    await removeFromFavorite(wineId);
  } catch (error) {
    console.error(error);
  }
};
