import r from 'rethinkdb';
import {getConnection} from '../utils/db';
import logger from '../utils/logger';

import { CELLAR_SCHEMA } from '../../common/constants/Cellar';
import { removeItem } from '../../common/constants/global';
import config from '../../../config';

function computeCellar(wines) {
    let boxId = 0,
        availableCells = {},
        selectedCells = {},
        bottlesByBoxes = {},
        selectableCells;

    CELLAR_SCHEMA.forEach(box => {
        availableCells[boxId] = Array(box.schema.reduce((x, y) => x * y, 1))
            .fill()
            .map((_, cellId) => cellId);
        boxId++;
    });

    wines.forEach(wine => {
        const bottles = wine.bottles.forEach(bottle => {
            const availableCellsInBox = removeItem(availableCells[bottle.box], availableCells[bottle.box].indexOf(bottle.cell));

            if (!bottlesByBoxes[bottle.box]) {
                bottlesByBoxes[bottle.box] = [];
            }
            bottlesByBoxes[bottle.box].push({cell: bottle.cell, wineType: wine.wineType});

            if (availableCellsInBox.length) {
                availableCells[bottle.box] = availableCellsInBox;
            } else {
                let {[bottle.box.toString()]: omit, ...res} = availableCells;
                availableCells = res;
            }
        });
    });

    selectableCells = {...availableCells};
    const selectableBoxes = Object.keys({...availableCells});
    selectedCells[selectableBoxes[0]] = [availableCells[selectableBoxes[0]].slice(0,1)[0]];

    if (availableCells[selectableBoxes[0]].length === 1) {
        let {[boxId]: omit, ...res} = selectableCells
        selectableCells = res;
    } else {
        selectableCells[selectableBoxes[0]] = removeItem(availableCells[selectableBoxes[0]], 0);
    }

    return {
        wines,
        availableCells,
        bottlesByBoxes,
        selectableCells,
        selectedCells,
    };
}

export const getCellar = () => {
    return getConnection
        .then(conn => {
            return r.table(config.DB.tables.WINE)
                .run(conn)
        })

        .then(cursor => cursor.toArray())
        .then(wines => {
            return computeCellar(wines);
        })
        .catch(error => {logger.error('Error getting Cellar', error)});
}

export const addWine = (wine) => {
    return getConnection
        .then(conn => {
            return r
                .table(config.DB.tables.WINE)
                .insert(wine)
                .run(conn);
        })
        .catch(error => {logger.error('Error adding Wine', error)});
}

export const onCellarChange = (cb) => {
    getConnection
        .then(conn => {
            r.table(config.DB.tables.WINE)
            .changes()
            .run(conn)
            .then(cursor => {
                cursor.each(function(err, item) {
                    getCellar().then(cb);
                 });
            })
            .catch(error => {logger.error('Error onCellarChange', error)});
        })

}
