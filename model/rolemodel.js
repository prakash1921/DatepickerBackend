const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RoleSchema = new Schema({
   
    RoleID: {
        type: String,
        default: " "
    },
    RoleName: {
        type: String,
        default: " "
    },
    UserID: {
        type: Number,
        default: 0
    },
    Username:{
        type: String,
        default: " "
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
module.exports = mongoose.model('role',RoleSchema)