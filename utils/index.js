const removeItem = (list, index) => {
  return list.slice(0, index).concat(list.slice(index + 1));
};

module.exports = {
  removeItem
};
