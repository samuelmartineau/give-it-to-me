import SSE from 'sse';

import logger from './utils/logger.js';
import { wineServices } from './wine/services.js';

function updateDispatcher(serverHttp, db) {
  const sse = new SSE(serverHttp);
  const { getCellar } = wineServices(db);
  const clients = [];

  sse.on('connection', (stream) => {
    logger.info('📲  SSE Opened connection');
    clients.push(stream);

    stream.on('close', () => {
      clients.splice(clients.indexOf(stream), 1);
      logger.info('😱 SSE Closed connection');
    });
  });

  const updateClients = async () => {
    const cellar = await getCellar();
    clients.forEach((stream) => {
      stream.send(JSON.stringify({ cellar }));
    });
  };

  return { updateClients };
}

export { updateDispatcher };
