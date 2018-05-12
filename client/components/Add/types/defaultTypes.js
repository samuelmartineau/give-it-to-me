import config from '~/config';

const { WINE_TYPES } = config.wineTypes;
const { BOTTLE_TYPES, DEFAULT_TYPE } = config.bottleTypes;

export const wineTypes = Object.keys(WINE_TYPES).map(key => ({
  id: key,
  ...WINE_TYPES[key]
}));
export const bottleTypes = Object.keys(BOTTLE_TYPES).map(key => ({
  id: key,
  ...BOTTLE_TYPES[key]
}));

export const defaultSelectedTypes = {
  wineType: wineTypes[0].id,
  wineCategory: wineTypes[0].categories[0],
  bottleType: DEFAULT_TYPE
};
