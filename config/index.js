module.exports = {
    DB: {
        user: process.env.USER,
        password: process.env.PASSWORD,
        host: process.env.HOST,
        database: process.env.DATABASE,
        tables: {
            WINE: 'wine',
            TRANSACTION: 'transaction'
        }
    },
    IS_HEROKU: process.env.HEROKU,
    debug: !process.env.DEBUG,
    PORT: process.env.PORT || 3000,
    LOGGER_INFO_FILE_PATH: 'info-logs.log',
    LOGGER_ERROR_FILE_PATH: 'error-logs.log',
    DIST: 'dist',
    UPLOADS_PERM: 'uploads',
    UPLOADS_TMP_DIRECTORY: 'temp_uploads/',
    BUNDLE_FILENAME: 'bundle.js'
};
