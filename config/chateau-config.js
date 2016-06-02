// RethinkDB settings
exports.host = process.env.HOST;    // RethinkDB host
exports.port = 28015;          // RethinkDB driver port
exports.authKey = '';          // Authentification key (leave an empty string if you did not set one)

// Express settings
exports.expressPort = 3001;    // Port used by express
exports.debug = true;          // Debug mode
exports.network = '127.0.0.1'  // Network the node app will run on
