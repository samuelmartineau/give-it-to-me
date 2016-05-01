import Action from '../models/Action';
import logger from '../utils/logger';
import config from '../../../config';

export default function(store) {
    return (data) => {
        let action = new Action(data);
        action.save().then(()=> {
            store.dispatch(data);
        }).catch(error => {
            logger.error(error);
        });

        if (config.IS_HEROKU) {
            store.dispatch(data);
        }
    }
}
