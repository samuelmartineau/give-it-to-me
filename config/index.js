module.exports = {
    debug: !process.env.production,
    PORT: 3000,
    URL: 'localhost',
    LOGGER_FILE_PATH: 'all-logs.log',
    API_BASE_URL: '/api',
    UPLOADS: {
    TMP_DIRECTORY: 'temp_uploads/',
    FILE_NAME: 'winePicture',
    THUMBNAIL: {
        WIDTH: 100,
        HEIGHT: 200,
        QUALITY: 30
    }
};
