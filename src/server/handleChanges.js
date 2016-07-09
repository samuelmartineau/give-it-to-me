import SSE from 'sse'

import logger from './utils/logger'
import * as ActionTypes from '../common/constants/ActionTypes'
import {getCellar} from './wine/services'
import {getFavorite} from './favorite/services'

const clients = []

function handleChange (type) {
  const actions = {}
  actions[changeTypes.FAVORITE] = () => getFavorite()
    .then(favorite => ({action: ActionTypes.SET_FAVORITE, state: favorite}))

  actions[changeTypes.CELLAR] = () => getCellar()
    .then(cellar => ({action: ActionTypes.SET_CELLAR, state: cellar}))

  if (typeof actions[type] !== 'function') {
    return Promise.reject()
  }

  return actions[type]()
}

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
  handleChange(type).then(response => {
    clients.forEach(stream => {
      stream.send(JSON.stringify(response))
    })
  })
}

export const changeTypes = {
  CELLAR: 'CELLAR',
  FAVORITE: 'FAVORITE'
}
