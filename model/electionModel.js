const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ElectionSchema = new Schema({
    ID:{
        type: Number,
        default: 0
    },
    ElectionID: {
        type: Number,
        default: 0
    },
    ElectionResult:{
        type:String,
        default:" "
    }
},{timestamps:true});

module.exports = mongoose.model('elction',ElectionSchema)