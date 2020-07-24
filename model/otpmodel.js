const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OtpSchema = new Schema({
    UserID: {
        type: Number,
        default: 1
    },
    Username: {
        type: String,
        default: " "
    },
    newPassword: {
        type: String,
        default: " "
    },
    Confirmpassword: {
        type: String,
        default: " "
    },
    OTP:{
        type: Number
    },
    MobileNumber: {
        type: Number,
        default:1234567890
    },
});
// }, { timestamps: true });
module.exports = mongoose.model('otp', OtpSchema)