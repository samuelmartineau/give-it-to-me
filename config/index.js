module.exports = {
    DB: {
        user: process.env.USER,
        password: process.env.PWD,
        host: process.env.HOST,
        database: process.env.DATABASE
    },
    IS_HEROKU: process.env.HEROKU,
    debug: !process.env.production,
    PORT: process.env.PORT || 3000,
    URL: 'localhost',
    LOGGER_FILE_PATH: 'all-logs.log',
    DIST: 'dist',
    UPLOADS_TMP_DIRECTORY: 'temp_uploads/',
    BUNDLE_FILENAME: 'bundle.js'
};
