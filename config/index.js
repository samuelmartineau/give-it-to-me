module.exports = {
    DB: {
        user: process.env.USER,
        password: process.env.PWD,
        host: process.env.HOST,
        database: process.env.DATABASE
    },
    debug: !process.env.production,
    PORT: 3000,
    URL: 'localhost',
    LOGGER_FILE_PATH: 'all-logs.log',
    UPLOADS_TMP_DIRECTORY: 'temp_uploads/'
};
