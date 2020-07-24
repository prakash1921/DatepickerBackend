const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LocationSchema = new Schema({
    HospitalID:{
        type:Number
    },
    LocationID:{
        type:Number
    },
    LocationName:{
        type:String
    },
    CreationID: {
        type: Number,
        default: 1
    },
    CreationDate: {
        type: Date,
        default: Date.now,
    },
    ModificationID: {
        type: Number,
        default: 1
    },
    ModificationDate: {
        type: Date,
        default: Date.now,
    },
    Rowstatus:{
        type:Number,
        default:0
    }
})
// },{timestamps:true});
module.exports = mongoose.model('dbo.newhospitallocations',LocationSchema)