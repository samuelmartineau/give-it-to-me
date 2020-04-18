const SSE = require('sse');

const logger = require('./utils/logger');
const { getCellar } = require('./wine/services');

const clients = [];

const handleChanges = (serverHttp) => {
  const sse = new SSE(serverHttp);

  sse.on('connection', (stream) => {
    logger.info('📲  SSE Opened connection');
    clients.push(stream);

    stream.on('close', () => {
      clients.splice(clients.indexOf(stream), 1);
      logger.info('😱 SSE Closed connection');
    });
  });
};

const updateClients = () => {
  getCellar().then((cellar) => {
    clients.forEach((stream) => {
      stream.send(JSON.stringify({ cellar }));
    });
  });
};

module.exports = {
  handleChanges,
  updateClients,
};
