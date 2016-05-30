import React, {Component, PropTypes} from 'react';

import UploadPicture from '../UploadPicture';

const PictureStep = (props) => {
    return (
        <div>
            <UploadPicture {...props} />
        </div>
    );
};

export default PictureStep;
