const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const JsonDataSchema = new Schema({
    ID:{
        type: Number,
        default: 0
    },
    Data:[],
    "Electoral District Number":{
        type: Number,
        default: 0
    },
    "Polling Station Number": {
        type: Number,
        default: 0
    },
    "Rejected Ballots":{
        type: Number,
        default: 0
    },
    "Total Votes":{
        type: Number,
        default: 0
    },
    "Electors":{
        type:Number,
        default:1
    },
    "Candidate Name":{
        type: String,
        default: ""
        // type:Date,
        // default:Date.now
    },
    "Votes": {
        type: Number,
        default: 0
    },
    "Political Affiliation": {
        type: String,
        default: ""
    },
    "Color Code": {
        type: String,
        default: ""
    },
},{timestamps:true});
module.exports = mongoose.model('JsonData',JsonDataSchema)