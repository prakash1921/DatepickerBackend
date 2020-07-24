var express = require('express');
var router = express.Router();
const newUserModel = require('../../model/newUsermodel')
const roleModel = require('../../model/newrolesModel')
var bcrypt_1 = require('bcrypt');
const mongoose_1 = require('mongoose');
const rolesModel = require('../../model/newrolesModel');

router.get('/getAllUserRights', function (req, res) {
    // newUserModel.find({ RowStatus: 0 }, function (err, resp) {
    newUserModel.find({ }, function (err, resp) {

        if (err) {
            res.send(err)
        } else {
            res.send(resp)
        }
    });
});

router.get('/searchUserRights', function (req, res) {
    newUserModel.find({ $and: [{ UserName: new RegExp(req.body.name, "i") }, { isActive: true }, { RowStatus: 0 }] }, function (err, resp) {
        if (err) {
            res.send(err)
        } else {
            res.send(resp)
        }
    });
});


router.post('/saveUser', function (req, res) {
    var id
    newUserModel.find({ $and: [{ UserName: req.body.Username }, { RowStatus: 0 }] }, function (err, response) {
        if (response.length > 0) {
            res.send({ status: false, msg: 'This User Name Already Exist' });
        } else {
            getIncrementedNewUserID(function (err, no) {
                if (no.length == 0) {
                    id = 1;
                } else {
                    id = no[0].NewUserID + 1;
                }
                console.log("req.body",req.body)
                var saveNewUser = new newUserModel({
                    PrintUserName: req.body.data.PrintUserName,
                    Email: req.body.data.email,
                    NewUserID: id,
                    Username:req.body.data.Username,
                    Password: createdPassword(req.body.data.password),
                    RoleID: Number(req.body.Role),
                    HospitalID: Number(req.body.data.HospitalID),
                    LocationID: Number(req.body.data.LocationID),
                });
                saveNewUser.save(function (error, resss) {
                    if (error) {
                        res.send(error);
                    } else {
                        res.send({ status: true, msg: 'User Added Successfully.' })
                    }
                })
            })
        }
    })
})




router.post('/remove', function (req, res) {
    newUserModel.update({ _id: req.body.id }, { $set: { 'RowStatus': 1 } }, function (err, resp) {
        if (err) {
            res.send(err)
        } else {
            res.send(resp)
        }
    });
});

router.get('/details/:id', function (req, res) {
    newUserModel.aggregate([{ $match: { $and: [{ _id: mongoose_1.Types.ObjectId(req.params.id) }] } },
    {
        $lookup: {
            from: "dbo.newroles",
            localField: "RoleID",
            foreignField: "RoleID",
            as: "Role"
        },
    }
    ], function (err, resp) {
        if (err) {
            res.send(err)
        } else {
            console.log("fffrr",resp)
            res.send(resp)
        }
    });
})





router.post('/updateUser', (req, res) => {
    console.log("data for update",req.body)
    rolesModel.findOne({ $and: [{ RoleID: Number(req.body.RoleID) }] }, (err, resp) => {
        if (resp == null) {
            res.send({ status: false, msg: "Please Select Role" });
        } else {
            newUserModel.update({ _id: req.body.id },
                {
                    $set: {
                        'PrintUserName': req.body.data.PrintUserName,
                        'Email': req.body.data.email,
                        'Username': req.body.data.Username,
                        'RoleID': Number(req.body.RoleID),
                        'HospitalID': Number(req.body.data.HospitalID),
                        'LocationID': Number(req.body.LocationID)
                    }
                }, (errr, response) => {
                    if (errr) {
                        console.log("eeee",errr)
                        res.send(errr);
                    } else {
                        res.send(response);
                    }
                })
        }
    })
})

function getIncrementedNewUserID(cb) {
    newUserModel.find(function (err, resp) {
        if (err) {
            cb(err, null)
        } else {
            cb(null, resp)
        }
    }).sort({ NewUserID: -1 }).limit(1);
}

function createdPassword(password) {
    return bcrypt_1.hashSync(password, bcrypt_1.genSaltSync(9));
}


function getNewUser() {
    newUserModel.find(function (err, resp) {
        if (err) {
          console.log("eee",err)
        } else {
            console.log("eee",resp)
        }
    })
}
getNewUser();

module.exports = router;
