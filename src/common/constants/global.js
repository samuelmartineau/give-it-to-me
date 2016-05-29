export const LARGE_SCREEN_MIN = 992;

export const removeItem = (list, index) => {
    return list
            .slice(0, index)
            .concat(list.slice(index + 1));
};

export const noTilde = (s) => {
    if (s.normalize != undefined) {
        s = s.normalize ('NFKD');
    }
    return s.replace (/[\u0300-\u036F]/g, '');
};
