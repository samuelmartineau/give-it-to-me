export const INITIAL_STATE = {
    wines: []
};

export function addWine(state, wine) {
    return {...state, wines: [...state.wines, wine]};
}
