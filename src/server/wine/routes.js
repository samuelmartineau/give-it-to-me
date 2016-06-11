import logger from '../utils/logger';
import config from '../../../config';
import * as serverConstants from '../../common/constants/server';
import {addWine} from './services';
import {moveWineToPermanetFolder} from '../pictures/services';

export default router => {
    router.post(serverConstants.ROUTES.WINE, (req, res) => {
        return moveWineToPermanetFolder(req.body.thumbnailFileName, req.body.pictureFileName)
            .then(fileUploaded => {
                let actionFormated = {...req.body,
                    ...fileUploaded
                };
                return addWine(actionFormated)
                    .then(message => {
                        res.status(200).json(message);
                    })
                    .catch(error => {
                        res.status(500).json(error);
                    });
            });
    });
};
