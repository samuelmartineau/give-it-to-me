module.exports = {
    DB: {
        user: process.env.USER,
        password: process.env.PASSWORD,
        host: process.env.HOST,
        database: process.env.DATABASE
    },
    IS_HEROKU: process.env.HEROKU,
    debug: !process.env.DEBUG,
    PORT: process.env.PORT || 3000,
    LOGGER_FILE_PATH: 'all-logs.log',
    DIST: 'dist',
    UPLOADS_TMP_DIRECTORY: 'temp_uploads/',
    BUNDLE_FILENAME: 'bundle.js'
};
