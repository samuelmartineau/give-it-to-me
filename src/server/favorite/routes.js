import * as serverConstants from '../../common/constants/server'
import {addToFavorite, removeFromBasket} from './services'

export default router => {
  router.post(serverConstants.ROUTES.FAVORITE, (req, res) => {
    return addToFavorite(req.body.wineId).then(message => {
      res.status(200).json(message)
    }).catch(error => {
      res.status(500).json(error)
    })
  })

  router.delete(serverConstants.ROUTES.FAVORITE, (req, res) => {
    return removeFromBasket(req.body.basketId).then(message => {
      res.status(200).json(message)
    }).catch(error => {
      res.status(500).json(error)
    })
  })
}
