export default {
  cleanString: (str) => {
    let s = str.toLowerCase();
    if (s.normalize !== undefined) {
      s = s.normalize('NFKD');
    }
    return s
      .replace(/[\u0300-\u036F]/g, '')
      .replace(/\s+/g, ' ')
      .replace(/-/g, ' ');
  },
  removeItem: (list, index) => {
    return list.slice(0, index).concat(list.slice(index + 1));
  },
};
