var express = require('express');
var router = express.Router();
const newrolesModel = require('../../model/newrolesModel');

router.post('/saveRole', function (req, res) {
    var data = req.body;
    newrolesModel.find({ $and: [{ RoleName: req.body.RoleName }, { RowStatus: 0 }] }, function (err, response) {
        if (response.length > 0) {
            res.send({ status: false, msg: 'This Role Name Already Exist' });
        } else {
            getRoleID(function (err, no) {
                var saveObject = {}
                if (no.length == 0) {
                    saveObject.RoleID = 1;
                } else {
                    saveObject.RoleID = no[0].RoleID + 1;
                }

                saveObject.RoleName = data.RoleName;
                saveObject.hospitalRights = data.hospArray;
                saveObject.dashBoardRights = data.dashArray;
                saveObject.masterRights = data.masterArray;
                saveObject.patientRights = data.patientArray;
                saveObject.reportRights = data.reportArray;
                saveObject.LocationID = data.LocationID;
                saveObject.CreationDate = new Date();
                var role = new newrolesModel(saveObject)
                role.save(function (error, resss) {
                    if (error) {
                        res.send(error);
                    } else {
                        res.send({ status: true, msg: 'Role Added Successfully.' })
                    }
                })
            })
        }
    })
})


function getRoleID(cb) {
    newrolesModel.find(function (err, resp) {
        if (err) {
            cb(err, null)
        } else {
            cb(null, resp)
        }
    }).sort({ RoleID: -1 }).limit(1);
}


router.get('/getAllRoles', function (req, res) {
    // newrolesModel.find({ RowStatus: 0 }, function (err, resp) {
    newrolesModel.find({ }, function (err, resp) {

        if (err) {
            res.send(err)
        } else {
            res.send(resp)
        }
    });
});


router.get('/getRoleById/:id', function (req, res) {
    newrolesModel.findOne({ _id: req.params.id }, function (err, resp) {
        if (err) {
            res.send(err)
        } else {
            res.send(resp)
        }
    });
})

router.get('/getRoleByRoleID/:id', function (req, res) {
    newrolesModel.findOne({ RoleID: req.params.id }, function (err, resp) {
        if (err) {
            res.send(err)
        } else {
            res.send(resp)
        }
    });
})

router.post('/remove', function (req, res) {
    newrolesModel.update({ _id: req.body.id }, { $set: { 'RowStatus': 1 } }, function (err, resp) {
        if (err) {
            res.send(err)
        } else {
            res.send(resp)
        }
    });
});

router.post('/searchRoles', function (req, res) {
    console.log("rollll",req.body.name)
    newrolesModel.find({ $and: [{ RoleName: new RegExp(req.body.name, "i") }] }, function (err, resp) {
        if (err) {
            res.send(err)
        } else {
            res.send(resp)
        }
    });
});

router.post('/updateRole', (req, res) => {
    newrolesModel.update({ _id: req.body.id },
        {
            $set: {
                'LocationID': Number(req.body.LocationID),
                'RoleName': req.body.RoleName,
                'dashBoardRights': req.body.dashArray,
                'hospitalRights': req.body.hospArray,
                'masterRights': req.body.masterArray,
                'patientRights': req.body.patientArray,
                'reportRights': req.body.reportArray,

            }
        }, (errr, response) => {
            if (errr) {
                res.send(errr);
            } else {
                res.send(response);
            }
        })

})

function getallrole(){
    newrolesModel.find({}, function (err, resp) {
        if (err) {
          console.log("errr")
        } else {
            console.log("errr",resp)
        }
    });
}

// getallrole();
module.exports = router;
