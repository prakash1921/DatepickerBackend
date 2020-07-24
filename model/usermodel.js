const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    UserID: {
        type: Number,
        default: 0
    },
    PrintUserName: {
        type: String,
        default: " "
    },
    Username:{
        type:String,
        default:" "
    },
    Password: {
        type: String,
        default: " "
    },
    Email: {
        type: String,
        default: " "
    },
    
    RoleID: {
        type: Number,
        default: ""
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
module.exports = mongoose.model('user',UserSchema)