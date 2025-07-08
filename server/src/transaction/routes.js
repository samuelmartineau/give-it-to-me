import express from 'express';
import config from '../../../config/index.js';
import { transactionServices } from './services.js';
import logger from '../utils/logger.js';

function transactionRoutes(db, _updateClients) {
  const router = express.Router();

  const { getTransactions } = transactionServices(db);

  router.route(config.ROUTES.TRANSACTION).get(async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const result = await getTransactions(page, limit);
      res.status(200).json(result);
    } catch (error) {
      logger.error(error.stack);
      res.status(500).json({ message: 'Error fetching transactions' });
    }
  });

  return router;
}

export default transactionRoutes;
