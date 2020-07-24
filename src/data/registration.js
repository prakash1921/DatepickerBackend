
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const registrationModel = require('../../model/registrationmodel')
router.post('/save', function (req, res) {
    var data = req.body;

    getregistrationIncrementID(function (err, no) {
        var saveRegistration = {};
        console.log("re.body.", req.body)
        if (no.length != 0) {
            saveRegistration.UserID = no[0].UserID + 1
        } else {
            saveRegistration.UserID = 1;
        }
        saveRegistration.FirstName = req.body.firstName;
        saveRegistration.LastName = req.body.lastName;
        saveRegistration.Username = req.body.username;
        saveRegistration.Password = createPassword(req.body.password);
        saveRegistration.Email = req.body.email;
        saveRegistration.MobileNumber = req.body.mobilenumber;
        var register = new registrationModel(saveRegistration)
        register.save((err, response) => {
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

function getregistrationIncrementID(cb) {
    registrationModel.find((err, response) => {
        //   console.log('find',response[0].UserID)
        if (err) {
            cb(err, null)
        } else {
            cb(null, response)
        }
    }).sort({ UserID: -1 }).limit(1);
};
function createPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}
router.get('/getuserById/:username', function (req, res) {
    registrationModel.find({ Username: req.params.username }, function (err, resp) {
        if (err) {
            res.send(err)
        } else {
            res.send(resp)
        }
    });
});
router.post('/login', function (req, res) {
    console.log("dsdsds", req.body)
    registrationModel.find({ Username: req.body.username }, function (err, response) {
        if (err) {
            res.send(err)
        } else {
            if(response.length!=0){
                console.log("reee", response)
                console.log("reee", response[0].Password);
                // console.log("ddddddddddd",createPassword(req.body.password))
                const result = bcrypt.compareSync(req.body.password,response[0].Password);
                console.log("result", result);
                if(result){
                    console.log("last",response)
                    // const userObject = response.toObject();
                    const userObject = response;

                    delete userObject.password;
                    const expiry = Math.floor((Date.now() + (24 * 60 * 60 * 1000)) / 1000);
                    const token = jwt.sign({
                        userObject,
                        exp:expiry
                    },"secret_for_now");
                    const refToken = jwt.sign({
                        userObject,
                        exp:expiry
                    },"some_other_secret");
                res.status(200).send({
                    status:true,
                    token:token,
                    refToken:refToken,
                    Admin:response
                    // roleData:role
                });
            }else{
                      res.send({status:false,msg:"Invalid Password"})
                }
    
            }else{
                res.send({status:false,msg:"Invalid User"})
            }
            
        }
    });
});

router.post('/update', function (req, res) {
    console.log("dddddddddddupdate", req)
    registrationModel.update({ _id: req.body.id }, { $set: { 'Username': req.body.username, 'Password': createPassword(req.body.password) } }, function (err, resp) {
        if (err) {
            res.send(err)
        } else {
            console.log("dddddddddddupdate",resp)
            res.send(resp)
        }
    });
});



module.exports = router;
