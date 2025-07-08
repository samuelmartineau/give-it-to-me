import cellar from './cellar.js';
import wineTypes from './wineTypes.js';
import bottleTypes from './bottleTypes.js';
import utils from './utils.js';

const UNIVERSAL_API_URL = '';

export default Object.freeze({
  DB: {
    timeout: 5,
    tables: {
      WINE: {
        name: 'wine',
      },
      BOTTLE: {
        name: 'bottle',
        indexes: ['wine_id'],
      },
      TRANSACTION: {
        name: 'transaction',
      },
    },
  },
  LOGGER_INFO_FILE_PATH: 'info-logs.log',
  LOGGER_ERROR_FILE_PATH: 'error-logs.log',
  FILE_URL_PATH: 'files',
  UPLOADS_PERM_FOLDER: 'uploads',
  UPLOADS_TMP_FOLDER: 'temp_uploads',
  BUNDLE_FILENAME: 'bundle.js',
  ROUTES: {
    PICTURE: '/picture',
    WINE: '/wine',
    FAVORITE: '/favorite',
    BOTTLE: '/bottle',
    WINE_FAMILY: '/wineFamily',
    TRANSACTION: '/transactions',
  },
  PICTURE_UPLOAD: {
    FILE_NAME: 'winePicture',
    THUMBNAIL: {
      WIDTH: 300,
      HEIGHT: 400,
      QUALITY: 30,
    },
  },
  PICTURES_BASE_URL: 'pictures',
  API_BASE_URL: '/api',
  UNIVERSAL_API_URL,
  cellar,
  wineTypes,
  utils,
  bottleTypes,
});
