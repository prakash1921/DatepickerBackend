const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const newStateSchema = new Schema({
    ID:{
        type: Number,
        default: 0
    },
    ElectionID: {
        type: Number,
        default: 0
    },
    stateID: {
        type: Number,
        default: 0
    },
    stateData:[],
   
},{timestamps:true});
module.exports = mongoose.model('newState',newStateSchema) 