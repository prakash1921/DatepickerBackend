const mongoose =  require('mongoose');
const Schema = mongoose.Schema;
const uploaddischargeSchema = new Schema({
    HospitalID:{
        type:Number,
        default:1
    },
    Location:{
        type:Number,
        default:1
    },
    UploadID:{
        type:Number,
        default:0
    },
    OPDIPDNO:{
        type:Number,
        default:0
    },
    PatientRegNo:{
        type:Number,
        default:0
    },
    PatientIPDDischargeID:{
        type:Number,
        default:0
    },
    FileType:{
        type:String,
        default:" "
    },
    FileNamearray:[{
        name:{
            type:String,
        },
        url:{
            type:String,
        }
    }],
    FilePath:{
        type:String,
        default:" " 
    },
    FileName:{
        type:String,
        default:" " 
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
module.exports = mongoose.model('dbo.uploaddischarges',uploaddischargeSchema);