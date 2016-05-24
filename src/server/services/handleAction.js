import uuid from 'node-uuid';

import Action from '../models/Action';
import logger from '../utils/logger';
import config from '../../../config';
import {ADD_WINE} from '../actions';

export default function(store) {
    return (action) => {
        let actions = {};
        actions[ADD_WINE] = () => {action.data.id = uuid.v1();}

        action[action.type]();

        let newAction = new Action(action);
        newAction.save().then(() => {
            store.dispatch(action);
        }).catch(error => {
            logger.error(error);
        });

        if (config.IS_HEROKU) {
            store.dispatch(action);
        }
    }
}
