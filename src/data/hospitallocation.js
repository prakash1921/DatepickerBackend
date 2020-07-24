var express = require('express');
var router = express.Router();
const hospitallocationModel = require('../../model/hospitallocationModel');


router.post('/save', function (req, res) {
    var data = req.body;

    getIncrementID(function (err, no) {
        var saveLocation = {};
        console.log("re.body.", req.body)
        if (no.length != 0) {
            saveLocation.LocationID = no[0].LocationID + 1
        } else {
            saveLocation.LocationID = 1;
        }

        saveLocation.LocationName = "Mira Road";
        saveLocation.HospitalID = 1;
        var location = new hospitallocationModel(saveLocation)
        location.save((err, response) => {
            if (err) {
                console.log("err", err)
                res.send(err)
            } else {
                console.log("fddddddd", response)
                res.send(response)
            }
        });
    })
});

function getIncrementID(cb) {
    hospitallocationModel.find((err, response) => {
        //   console.log('find',response[0].UserID)
        if (err) {
            cb(err, null)
        } else {
            cb(null, response)
        }
    }).sort({ LocationID: -1 }).limit(1);
};

router.get('/getAllHospitallocations', function (req, res) {
    hospitallocationModel.find({ $and: [{ Rowstatus: 0 }] }, function (err, resp) {
        if (err) {
            res.send(err)
        } else {
            res.send(resp)
        }
    })
})

function save() {
    var saveLocation = {};
    saveLocation.LocationID = 3;
    saveLocation.LocationName = "Mulund";
    saveLocation.HospitalID = 1;
    var location = new hospitallocationModel(saveLocation)
    location.save((err, response) => {
        if (err) {
            console.log("err", err)
            // res.send(err)
        } else {
            console.log("fddddddd", response)
            // res.send(response)
        }
    });
}
// save();
module.exports = router;