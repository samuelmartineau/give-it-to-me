import path from 'path'

import * as serverConstants from '../../common/constants/server'
import {addToFavorite, removeFromFavorite} from './services'
import {updateClients} from '../handleChanges'

export default router => {
  router.post(serverConstants.ROUTES.FAVORITE, (req, res, next) => {
    return addToFavorite(req.body.wineId).then(message => {
      updateClients()
      res.status(200).json(message)
    }).catch(error => {
      res.status(500).json(error)
    })
  })

  router.delete(path.join(serverConstants.ROUTES.FAVORITE, ':wineId'), (req, res, next) => {
    return removeFromFavorite(req.params.wineId).then(message => {
      updateClients()
      res.status(200).json(message)
    }).catch(error => {
      res.status(500).json(error)
    })
  })
}
