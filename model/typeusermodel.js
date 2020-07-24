const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    UserID: {
        type: Number,
        default: 0
    },
    UserName:{
        type:String,
        default:" "
    },
});
module.exports = mongoose.model('typeuser',UserSchema)