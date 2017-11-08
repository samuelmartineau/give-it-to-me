import * as cellar from "./cellar/cellar.actions";

// export * from "./cellar/cellar.actions";

export const getCellar = () => {
  return dispatch => {
    return dispatch(cellar.getCellar());
  };
};
