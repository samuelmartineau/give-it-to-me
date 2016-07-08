import express from 'express'

import pictureRoutes from './pictures/routes'
import basketRoutes from './favorite/routes'
import wineRoutes from './wine/routes'
import bottleRoutes from './bottle/routes'
import * as serverConstants from '../common/constants/server'

export default(app) => {
  const router = express.Router(() => {})
  pictureRoutes(router)
  basketRoutes(router)
  wineRoutes(router)
  bottleRoutes(router)
  app.use(serverConstants.API_BASE_URL, router)
}
