import urlJoin from 'url-join'

import * as serverConstants from '../../common/constants/server'
import {removeBottle} from './services'
import {updateClients} from '../handleChanges'

export default router => {
  router.delete(urlJoin(serverConstants.ROUTES.BOTTLE, ':bottleId'), (req, res, next) => {
    const {bottleId} = req.params
    const {wineId} = req.body
    return removeBottle(parseInt(wineId), parseInt(bottleId)).then(message => {
      updateClients()
      res.status(200).json(message)
    }).catch(error => {
      res.status(500).json(error)
    })
  })
}
