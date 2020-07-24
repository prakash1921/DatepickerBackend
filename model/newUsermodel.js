const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    NewUserID: {
        type: Number
    },
    PrintUserName: {
        type: String
    },
    Email: {
        type: String
    },
    Username:{
        type:String
    },
    Password: {
        type: String
    },
    RoleID: {
        type: Number
    },
    HospitalID:{
        type:Number
    },
    LocationID:{
        type:Number
    },
    isActive: {
        type: Boolean,
        default: true
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
},{timestamps:true});
module.exports = mongoose.model('dbo.newusers',UserSchema)