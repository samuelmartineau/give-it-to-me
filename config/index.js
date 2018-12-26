const cellar = require('./cellar');
const wineTypes = require('./wineTypes');
const bottleTypes = require('./bottleTypes');
const utils = require('./utils');
const defaultPort = process.env.PORT || 3000;
const devProxyPort = process.env.PROXY_PORT || 3005;
const isDev = process.env.NODE_ENV !== 'production';
const publicURL = (function() {
  const isBrowser = typeof window !== 'undefined';
  if (isDev) {
    return `http://localhost:${devProxyPort}`;
  }
  if (isBrowser) {
    return window.location.origin;
  }
  return '';
})();
const SERVER_URL =
  typeof window !== 'undefined'
    ? window.location.origin
    : `http://localhost:${defaultPort}`;
const assetsBaseUrl = '/assets';

module.exports = {
  DB: {
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    database: process.env.DATABASE,
    timeout: 5,
    filename: 'db_v1.db',
    // filename: 'gitm-5-11-2017.db',
    tables: {
      WINE: {
        name: 'wine'
      },
      BOTTLE: {
        name: 'bottle',
        indexes: ['wine_id']
      },
      TRANSACTION: {
        name: 'transaction'
      }
    }
  },
  debug: !process.env.DEBUG,
  PORT: defaultPort,
  LOGGER_INFO_FILE_PATH: 'info-logs.log',
  LOGGER_ERROR_FILE_PATH: 'error-logs.log',
  UPLOADS_PERM: 'uploads',
  UPLOADS_TMP_DIRECTORY: 'temp_uploads/',
  BUNDLE_FILENAME: 'bundle.js',
  ROUTES: {
    PICTURE: '/picture',
    WINE: '/wine',
    FAVORITE: '/favorite',
    BOTTLE: '/bottle',
    WINE_FAMILY: '/wineFamily'
  },
  PICTURE_UPLOAD: {
    FILE_NAME: 'winePicture',
    THUMBNAIL: {
      WIDTH: 300,
      HEIGHT: 400,
      QUALITY: 30
    }
  },
  ASSETS_BASE_URL: assetsBaseUrl,
  API_BASE_URL: '/api',
  API_URL: SERVER_URL,
  CORS_CONFIG: { origin: true, credentials: true, allowedHeaders: '*' },
  cellar,
  wineTypes,
  utils,
  bottleTypes,
  isProduction: process.env.NODE_ENV === 'production',
  devProxyPort,
  buildAssetsUrl(url) {
    const separator = url[0] === '/' ? '' : '/';
    return `${publicURL}${separator}${url}`;
  }
};
