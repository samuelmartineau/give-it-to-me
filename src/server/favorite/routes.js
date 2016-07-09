import * as serverConstants from '../../common/constants/server'
import {addToFavorite, removeFromFavorite} from './services'
import {updateClients, changeTypes} from '../handleChanges'

export default router => {
  router.post(serverConstants.ROUTES.FAVORITE, (req, res, next) => {
    return addToFavorite(req.body.wineId).then(message => {
      updateClients(changeTypes.FAVORITE)
      res.status(200).json(message)
    }).catch(error => {
      res.status(500).json(error)
    })
  })

  router.delete(serverConstants.ROUTES.FAVORITE, (req, res, next) => {
    return removeFromFavorite(req.body.favoriteId).then(message => {
      updateClients(changeTypes.FAVORITE)
      res.status(200).json(message)
    }).catch(error => {
      res.status(500).json(error)
    })
  })
}
