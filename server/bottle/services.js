const { knexInstance, Wine, Bottle } = require('../utils/db');
const logger = require('../utils/logger');

const removeBottles = bottleIds => {
  return knex.transaction(trx => {
    return Bottle.where('id', 'in', bottleIds)
      .fetchAll({})
      .then(response => {
        console.log('good', response);
        return response;
      })
      .catch(error => {
        console.log('sam sam', error);
      });
  });

  return Wine.where({ id: wineId })
    .fetch({
      withRelated: [
        {
          bottles: query => {
            query.where({ _deleted: 0 });
          }
        }
      ]
    })
    .then(wine => {
      wine = wine.toJSON();
      const { bottles } = wine;
      const bottle = bottles.find(bottle => bottle.id === bottleId);
      const isLastBottle = bottles.length === 1;
      if (bottle) {
        return knexInstance.transaction(trx => {
          return knexInstance('bottles')
            .where({ id: bottleId })
            .update({
              _deleted: true
            })
            .transacting(trx)
            .then(() => {
              const successMessage = {
                message: 'Bouteille supprimée avec succés'
              };
              if (isLastBottle) {
                return knexInstance('wines')
                  .where({ id: wineId })
                  .update({
                    _deleted: true,
                    isFavorite: false
                  })
                  .transacting(trx)
                  .then(() => {
                    return successMessage;
                  });
              }
              return successMessage;
            });
        });
      } else {
        logger.error('Bottle not found');
      }
    })
    .catch(error => {
      logger.log('error', error);
      Promise.reject({
        message:
          'Probleme lors de la suppression de la bouteille dans la base de données'
      });
    });
};

module.exports = {
  removeBottles
};
