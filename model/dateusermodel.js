const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserdateSchema = new Schema({
    No:{
        type: Number,
        default: 0
    },
    UserID: {
        type: Number,
        default: 0
    },
    UserName:{
        type:String,
        default:" "
    },
    Date:{
        type:Date
    },
    CreationID:{
        type:Number,
        default:1
    },
    CreationDate:{
        type:Date,
        default:Date.now
    }

});
module.exports = mongoose.model('dateuser',UserdateSchema)