var express = require('express');
var router = express.Router();
var moment = require('moment');
const dateModel = require('../../model/dateusermodel');


router.post('/save', function (req, res) {
    var data = req.body;
    console.log(req.body);
    getIncrementID(function (err, no) {
        var savedata = {};
        console.log("re.body.", req.body)
        if (no.length != 0) {
            savedata.No = no[0].No + 1
        } else {
            savedata.No = 1;
        }
        savedata.Date = myfunction(data.Date,data.Time);
        save.CreationDate = myfunction(data.billdateforformat,data.Time);
        var datesave = new dateModel(savedata)
        datesave.save((err, response) => {
            if (err) {
                console.log("err", err)
                res.send(err)
            } else {
                console.log("fddddddd", response)
                res.send(response)
            }
        });
    })

})


function getIncrementID(cb) {
    dateModel.find((err, response) => {
        //   console.log('find',response[0].UserID)
        if (err) {
            cb(err, null)
        } else {
            cb(null, response)
        }
    }).sort({ UserID: -1 }).limit(1);
};
function myfunction(date,time){
console.log("date time",date,time);
var timeSplit = time.split(':');
console.log("rrr",timeSplit);
if (Number(timeSplit[0]) == 01 || Number(timeSplit[0]) == 02 || Number(timeSplit[0]) == 03 || Number(timeSplit[0]) == 04 || Number(timeSplit[0]) == 05){
    var newTime = "05:30";
}else{
    var newTime = time;
}
if(date !=undefined || date !=null){
    const str = (data).split("-");
    const dateff = str[1] + "-" + str[0] + "-" + str[2];
    const dateTime = dateff + " " + moment(newTime,"h:mm a").format("HH:mm");
    const dateObject = new Date(dateTime);
    console.log("wwwwwwwwwwwwwww", dateObject);
    return dateObject;

}else{
    var newDate = new Date().toISOString();
    return newDate
}
}
module.exports = router;