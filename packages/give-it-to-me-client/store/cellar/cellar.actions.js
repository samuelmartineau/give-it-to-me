import { CELLAR_REQUEST, CELLAR_RECEIVED, CELLAR_FAILED } from './cellar.types';

export const setCellar = cellar => ({
  type: CELLAR_RECEIVED,
  cellar
});
export const cellarRequest = () => ({
  type: CELLAR_REQUEST
});
export const cellarFailed = () => ({
  type: CELLAR_FAILED
});

export function getCellar() {
  return async (dispatch, _, { getCellar }) => {
    dispatch(cellarRequest());
    try {
      const cellar = await getCellar();
      dispatch(setCellar(cellar));
      return cellar;
    } catch (e) {
      console.error('getCellar error', e);
      dispatch(cellarFailed());
    }
  };
}
