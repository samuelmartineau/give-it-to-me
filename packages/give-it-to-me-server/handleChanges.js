const SSE = require("sse");

const logger = require("./utils/logger");
const {
  SET_CELLAR
} = require("../give-it-to-me-client/store/cellar/cellar.types");
const { getCellar } = require("./wine/services");

const clients = [];

const handleChanges = serverHttp => {
  const sse = new SSE(serverHttp);

  sse.on("connection", stream => {
    logger.info("📲  SSE Opened connection");
    clients.push(stream);

    stream.on("close", () => {
      clients.splice(clients.indexOf(stream), 1);
      logger.info("😱 SSE Closed connection");
    });
  });
};

const updateClients = type => {
  getCellar().then(cellar => {
    clients.forEach(stream => {
      stream.send(JSON.stringify({ action: SET_CELLAR, state: cellar }));
    });
  });
};

module.exports = {
  handleChanges,
  updateClients
};
