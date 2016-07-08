import * as serverConstants from '../../common/constants/server'
import {addToBasket, removeFromBasket} from './services'

export default router => {
  router.post(serverConstants.ROUTES.BASKET, (req, res) => {
    return addToBasket(req.body.wineId).then(message => {
      res.status(200).json(message)
    }).catch(error => {
      res.status(500).json(error)
    })
  })

  router.delete(serverConstants.ROUTES.BASKET, (req, res) => {
    return removeFromBasket(req.body.basketId).then(message => {
      res.status(200).json(message)
    }).catch(error => {
      res.status(500).json(error)
    })
  })
}
