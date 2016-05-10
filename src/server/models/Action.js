import mongooseCore from 'mongoose';
import Promise from 'bluebird';

import * as types from '../actions';

const mongoose = Promise.promisifyAll(mongooseCore);

const actionTypes = Object.keys(types);

const actionSchema = mongoose.Schema({
    _deleted: Boolean,
    type: {
        type: String,
        enum: actionTypes
    },
    data: Object,
    __v: {type: Number, select: false}
});

module.exports = mongoose.model('Action', actionSchema);
