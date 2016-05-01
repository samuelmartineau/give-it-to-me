import Action from '../models/Action';
import logger from '../utils/logger';

export default function(store) {
    return (data) => {
        let action = new Action(data);
        action.save().then(()=> {
            store.dispatch(data);
        }).catch(error => {
            logger.error(error);
        });

    }
}
