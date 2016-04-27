module.exports = {
    debug: !process.env.production,
    PORT: 3000,
    URL: 'localhost',
    LOGGER_FILE_PATH: 'all-logs.log',
    UPLOADS_TMP_DIRECTORY: 'temp_uploads/'
};
