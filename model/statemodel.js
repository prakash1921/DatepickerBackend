const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const stateSchema = new Schema({
    // ID:{
    //     type: Number,
    //     default: 0
    // },
    state:[],
   
},{timestamps:true});
module.exports = mongoose.model('state',stateSchema) 