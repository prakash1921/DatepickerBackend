const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const JsonDataSchema = new Schema({
    ID:{
        type: Number,
        default: 0
    },
    Age:{
        type: Number,
        default: 0
    },
    RollNo: {
        type: Number,
        default: 0
    },
    Address:{
        type: String,
        default: 0
    },
    city:{
        type:String,
        default:" "
    }
   
},{timestamps:true});
module.exports = mongoose.model('studentdata',JsonDataSchema)