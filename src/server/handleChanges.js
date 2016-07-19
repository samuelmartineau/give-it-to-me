import SSE from 'sse'

import logger from './utils/logger'
import * as ActionTypes from '../common/constants/ActionTypes'
import {getCellar} from './wine/services'

const clients = []

export default(serverHttp) => {
  const sse = new SSE(serverHttp)

  sse.on('connection', stream => {
    logger.info('📲  SSE Opened connection')
    clients.push(stream)

    stream.on('close', () => {
      clients.splice(clients.indexOf(stream), 1)
      logger.info('😱 SSE Closed connection')
    })
  })
}

export const updateClients = (type) => {
  getCellar()
    .then(cellar => {
      clients.forEach(stream => {
        stream.send(JSON.stringify({action: ActionTypes.SET_CELLAR, state: cellar}))
      })
    })
}
