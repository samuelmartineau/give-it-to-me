export const LARGE_SCREEN_MIN = 992;

export const removeItem = (list, index) => {
    return list
            .slice(0, index)
            .concat(list.slice(index + 1));
};
