import { CELLAR_REQUEST, CELLAR_RECEIVED, CELLAR_FAILED } from './wines.types';
import { CellarType } from '@/Cellar.type';

export const setCellar = (cellar: CellarType) => ({
  type: CELLAR_RECEIVED,
  payload: { cellar },
});
export const cellarRequest = () =>
  <const>{
    type: CELLAR_REQUEST,
  };
export const cellarFailed = () =>
  <const>{
    type: CELLAR_FAILED,
  };

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

export type WinesActions = ReturnType<
  typeof setCellar | typeof cellarRequest | typeof cellarFailed
>;
