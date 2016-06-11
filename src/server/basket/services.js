import r from 'rethinkdb';

import {getConnection} from '../utils/db';
import logger from '../utils/logger';
import config from '../../../config';

export const getBasket = () => {
    return getConnection
        .then(conn => {
            return r.table(config.DB.tables.BASKET)
                .run(conn)
        })
        .then(cursor => cursor.toArray())
        .catch(error => {
            logger.error('Error getting Basket', error);
            return Promise.reject({
                message: 'Probleme lors de la récupération du panier dans la base de données'
            });
        });
}

export const addToBasket = (wineId) => {
    debugger
    return getConnection
        .then(conn => {
            return r
                .table(config.DB.tables.BASKET)
                .insert({wineId: wineId, timestamp: new Date()})
                .run(conn)
                .then(() => ({
                    message: 'Vin ajouté au panier avec succés'
                }));
        })
        .catch(error => {
            logger.error('Error adding Wine to basket', error);
            return Promise.reject({
                message: 'Probleme lors de l\'ajout du vin au panier dans la base de données'
            });
        });
}

export const removeFromBasket = (basketId) => {
    return getConnection
        .then(conn => {
            return r
                .table(config.DB.tables.BASKET)
                .get(basketId)
                .delete()
                .run(conn)
                .then(() => ({
                    message: 'Vin supprimé au panier avec succés'
                }));
        })
        .catch(error => {
            logger.error('Error removing Wine from basket', error);
            return Promise.reject({
                message: 'Probleme lors de la suppréssion du vin du panier dans la base de données'
            });
        });
}

export const onBasketChange = (cb) => {
    getConnection
        .then(conn => {
            r.table(config.DB.tables.BASKET)
            .changes()
            .run(conn)
            .then(cursor => {
                cursor.each(function(err, item) {
                    getBasket().then(cb);
                 });
            })
            .catch(error => {logger.error('Error onCellarChange', error)});
        })

}
