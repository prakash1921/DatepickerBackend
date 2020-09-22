const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const newCitySchema = new Schema({
    ID:{
        type: Number,
        default: 0
    },
    stateID:{
        type: Number,
        default: 0
    },
    cityID:{
        type:Number,
        default:0
    },
    ElectionID: {
        type: Number,
        default: 0
    },
    cityData:[],
},{timestamps:true});
module.exports = mongoose.model('newCity',newCitySchema)