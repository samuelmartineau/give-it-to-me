import path from 'path'

import * as serverConstants from '../../common/constants/server'
import {removeBottle} from './services'

export default router => {
  router.delete(path.join(serverConstants.ROUTES.BOTTLE, ':wineId'), (req, res) => {
    return removeBottle(bottleId).then(message => {
      res.status(200).json(message)
    }).catch(error => {
      res.status(500).json(error)
    })
  })
}
