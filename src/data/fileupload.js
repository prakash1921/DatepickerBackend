var express = require("express");
var router = express.Router();
var multer = require('multer');
const path = require('path');
const filePath = 'E:/parakash dhobi/new data/HMS Project/hms_node_api/public/uploads'
const base_link = "http://localhost:8000/uploads/"
// and for server use this code for path 
// const filePath = process.env.Home+'/hms_node_api/public/uploads'
// const base_link = "http://hmstestapi.familycarehospitals.com/uploads/"
const uploaddischarge = require('../../model/uploaddischarge');
var mongoose = require('mongoose');


router.post('/save',function (req,res,next){
    var object;
    const storage = multer.diskStorage({
        destination: (req,file,callback) =>{
            callback(null,(filePath));
        },
        filename: (req,file,callback) =>{
            let exArray = file.originalname.split(".");
            let extension = extArray[exArray.length -1];
            callback(null,file.originalname)
        }
    });
    const upload = multer({ storage:storage }).any('daybook');
    upload(req,res,function (err) {
        if(err){
            console.log(err);
            return res.status(422).send("an Error occurred");
        }
        console.log("req.file",req.files);
        getuploaddischargeIncrementID(function (err,response){
            if(err){
                console.log("errr",err)
            }else{
                var saveupload = {};
                if(response.length!=0){
                    saveupload.UploadID = response[0].UploadID + 1;
                }else{
                    saveupload.UploadID = 1;
                }
                var obj = {name:req.files[0].filename,url:base_link + req.files[0].filename};
                let extArray = req.files[0].originalname.split(".");
                let extension = extArray[extArray.length -1];
                saveupload.FilePath = base_link + req.files[0].filename;
                saveupload.FileNamearray =obj;
                let filenewname = req.files[0].mimetype.split("/");
                saveupload.FileType = filenewname[0];
                saveupload.FileName=req.file[0].filename;
                saveupload.LocationID=Number(req.body.LocationID);
                saveupload.PatientRegNo=Number(req.body.PatientRegNo);
                saveupload.OPDIPDNO=Number(req.body.OPDIPDNO);
                saveupload.PatientIPDDischargeID=Number(req.body.PatientIPDDischargeID);
                var uploadfiles = new uploaddischarge(saveupload);
                uploadfiles.save((e,r) =>{
                    if(e){
                        console.log("fffff",e);
                    }else{
                        object = r;
                        res.json({data:r,originalname: req.files[0].originalname,uploadname: req.files[0].filename});
                    }
                })
            }
        })
    })
})

function getuploaddischargeIncrementID(cb){
    uploaddischarge.find((err,response) => {
        if(err){
          cb(err,null)
        }else{
          cb(null,response);
        }
    }).sort({UploadID :-1}).limit(1);
}
router.get('/getfileById/:id',function(req,res){
    console.log("sss  url hit");
    uploaddischarge.find({and:[{OPDIPDNO:req.params.id},{RowStatus:0}]},(err,response) => {
        if(err){
            res.send(err);
        }else{
            res.send(response);
        }
    })
});

router.get('/gethome',function(req,res){
    var title="Enter into Home Page";
res.send(title);
}

router.post('/remove',function(req,res){
    uploaddischarge.remove({_id:req.body.id},(err,response) => {
        if(err){
            res.send(err);
        }else{
            res.send(response);
        }
    })
});

router.post('/deletefile',function(req,res){
    uploaddischarge.update({_id:mongoose.Types.ObjectId(req.body.id)},{$set:{'Rowstatus':1}},(err,response) => {
        if(err){
            res.send(err);
        }else{
            uploaddischarge.find({and:[{OPDIPDNO:req.params.id},{RowStatus:0}]},(err1,response1) => {
                if(err1){
                    res.send(err1);
                }else{
                    res.send(response1);
                }
            })
        }
    })
});

router.post('/deletefilefromarray',function(req,res){
    uploaddischarge.update({_id:mongoose.Types.ObjectId(req.body._id)},{"$pull":{'FileNamearray':{"_id":req.body.item._id}}},(err,response) => {
        if(err){
            res.send(err);
        }else{
            res.send(response);
        }
    })
});



router.post('/update',function (req,res,next){
    const storage = multer.diskStorage({
        destination: (req,file,callback) =>{
            callback(null,(filePath));
        },
        filename: (req,file,callback) =>{
            let exArray = file.originalname.split(".");
            let extension = extArray[exArray.length -1];
            callback(null,file.originalname)
        }
    });
    const upload = multer({ storage:storage }).any('daybook');
    upload(req,res,function (err) {
        if(err){
            console.log(err);
            return res.status(422).send("an Error occurred");
        }
        var FileName = base_link + req.files[0].filename;
        uploaddischarge.update({$and:[{PatientIPDDischargeID:req.body.PatientIPDDischargeID},{_id:mongoose.Types.ObjectId(req.body._id)}]},{"$push":{'FileNamearray':{"name":req.files[0].filename,"url":FileName}}},(err,response) => {
            if(err){
                res.send(err);
            }else{
                uploaddischarge.find({$and:[{PatientIPDDischargeID:Number(req.body.PatientIPDDischargeID)},{RowStatus:0}]},(err,response) => {
                    if(err){
                        res.send(err);
                    }else{
                        res.json({data:arr});
                    }
                })
        }
        })
    });
});

function update() {
    var obj =[{name:"img11.jpeg",url:"http://localhost:8000/uploads/img11.jpeg"},{name:"rr.jpg",url:"http://localhost:8000/uploads/rr.jpg"}]
    uploaddischarge.find({$and:[{PatientIPDDischargeID:Number(4122)},{_id:"5e5585d6df65frg648948f"}]},{"$push":{"FileNamearray":obj}},(err,response) => {
        if(err){
            console.log("rerer",err)
        }else{
           console.log("reees",response)
        }
    })
}
//upload()
console.log("fileuploads page hit")
module.exports= router;

// var express = require('express');
// var router = express.Router();
// var moment = require('moment');
// const dateModel = require('../../model/dateusermodel');


// router.post('/save', function (req, res) {
//     var data = req.body;
//     console.log(req.body);
//     getIncrementID(function (err, no) {
//         var savedata = {};
//         console.log("re.body.", req.body)
//         if (no.length != 0) {
//             savedata.No = no[0].No + 1
//         } else {
//             savedata.No = 1;
//         }
//         savedata.Date = myfunction(data.Date,data.Time);
//         save.CreationDate = myfunction(data.billdateforformat,data.Time);
//         var datesave = new dateModel(savedata)
//         datesave.save((err, response) => {
//             if (err) {
//                 console.log("err", err)
//                 res.send(err)
//             } else {
//                 console.log("fddddddd", response)
//                 res.send(response)
//             }
//         });
//     })

// })


// function getIncrementID(cb) {
//     dateModel.find((err, response) => {
//         //   console.log('find',response[0].UserID)
//         if (err) {
//             cb(err, null)
//         } else {
//             cb(null, response)
//         }
//     }).sort({ UserID: -1 }).limit(1);
// };
// function myfunction(date,time){
// console.log("date time",date,time);
// var timeSplit = time.split(':');
// console.log("rrr",timeSplit);
// if (Number(timeSplit[0]) == 01 || Number(timeSplit[0]) == 02 || Number(timeSplit[0]) == 03 || Number(timeSplit[0]) == 04 || Number(timeSplit[0]) == 05){
//     var newTime = "05:30";
// }else{
//     var newTime = time;
// }
// if(date !=undefined || date !=null){
//     const str = (data).split("-");
//     const dateff = str[1] + "-" + str[0] + "-" + str[2];
//     const dateTime = dateff + " " + moment(newTime,"h:mm a").format("HH:mm");
//     const dateObject = new Date(dateTime);
//     console.log("wwwwwwwwwwwwwww", dateObject);
//     return dateObject;

// }else{
//     var newDate = new Date().toISOString();
//     return newDate
// }
// }
// module.exports = router;