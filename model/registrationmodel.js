const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RegistrationSchema = new Schema({
    UserID: {
        type: Number,
        default: 0
    },
    Username: {
        type: String,
        default: " "
    },
    RoleID:{
        type: Number,
        default: 1
    },
    FirstName: {
        type: String,
        default: " "
    },
    LastName: {
        type: String,
        default: " "
    },
    Password: {
        type: String,
        default: " "
    },
    Email: {
        type: String,
        default: " "
    },
    MobileNumber: {
        type: Number,
        default:1234567890
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
    Rowstatus: {
        type: Number,
        default: 0
    }
}, { timestamps: true });
module.exports = mongoose.model('registration', RegistrationSchema)