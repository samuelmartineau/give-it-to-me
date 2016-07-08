const defaultPort = process.env.PORT || 3000

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  },
  heroku: {
    isHeroku: true
  }
}[process.env.NODE_ENV || 'development']

module.exports = Object.assign({
  DB: {
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    database: process.env.DATABASE,
    timeout: 5,
    tables: {
      WINE: 'wine',
      FAVORITE: 'favorite',
      BOTTLE: 'bottle',
      TRANSACTION: 'transaction'
    }
  },
  debug: !process.env.DEBUG,
  PORT: defaultPort,
  DEV_PORT: defaultPort + 1,
  LOGGER_INFO_FILE_PATH: 'info-logs.log',
  LOGGER_ERROR_FILE_PATH: 'error-logs.log',
  DIST: 'dist',
  UPLOADS_PERM: 'uploads',
  UPLOADS_TMP_DIRECTORY: 'temp_uploads/',
  BUNDLE_FILENAME: 'bundle.js'
}, environment)
