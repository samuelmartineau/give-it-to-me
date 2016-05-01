import mongoose from 'mongoose';
import * as types from '../actions';

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
