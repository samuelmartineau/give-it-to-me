import path from 'path'

import * as serverConstants from '../../common/constants/server'
import {removeBottle} from './services'
import {updateClients, changeTypes} from '../handleChanges'

export default router => {
  router.delete(path.join(serverConstants.ROUTES.BOTTLE, ':bottleId'), (req, res, next) => {
    const {bottleId} = req.params
    const {wineId} = req.body
    return removeBottle(wineId, bottleId).then(message => {
      updateClients(changeTypes.CELLAR)
      res.status(200).json(message)
    }).catch(error => {
      res.status(500).json(error)
    })
  })
}
