var express = require('express');
var router = express.Router();
// const userModel = require('../../model/usermodel')
// const tuserModel = require('../../model/usermodel')
const registrationModel = require('../../model/registrationmodel')
const tregistrationModel = require('../../model/registrationmodel')
const otpModel = require('../../model/otpmodel')
var bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');


router.post('/save', function (req, res) {
    var data = req.body;
    registrationModel.find({ Username: req.body[0].Username }, function (err, resp) {
        console.log("req.body", req.body[0].Username, resp)
        if (resp.length != 0) {
            sendEmail(resp, function (err, resultemail) {
                if (resultemail.status == true) {
                    var saveObject = {};
                    saveObject.Username = req.body[0].Username;
                    saveObject.newPassword = resp[0].Password;
                    saveObject.Confirmpassword = resp[0].Password;
                    saveObject.OTP = Number(resultemail.data);
                    saveObject.UserID = req.body[0].UserID;
                    saveObject.MobileNumber = req.body[0].MobileNumber;
                    var otpDetails = new otpModel(saveObject);
                    otpDetails.save(function (err, responseee) {
                        if (err) {
                            res.send(err);
                        } else {
                            console.log('responseeee', responseee)
                            res.send({ status: true, data: responseee });
                        }
                    })
                }
            })
        } else {
            res.send({ status: false, message: "The User Does Not Exists" });
        }
    })
});

function sendEmail(resp, cb) {
    // https://myaccount.google.com/lesssecureapps?pli=1
    let transporter = nodemailer.createTransport({
        // host: "gmail",
        // port: 465,
        // secure: true, // true for 465, false for other ports
        // tls: {
        //     rejectUnauthorized: false
        // },
        service: "Gmail",
        auth: {
            user: 'dhobi.prakash123@gmail.com', // generated ethereal user
            pass: 'ammaaai@7295' // generated ethereal password
        }
    });
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    console.log('OTP', OTP, "resp[0].Email", resp);
    let mailOptions = {
        from: 'dhobi.prakash123@gmail.com', // sender address
        to: resp[0].Email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: 'Hello world?"Fred Foo 👻"', // plain text body
        html: 'Hello Pallavi "Fred Foo 👻" Your OTP for verification is ' + OTP, // html body
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            cb(err, null);
        } else {
            console.log("email data", info, "status: true, data: OTPstatus: true, data: OTP", OTP)
            cb(null, { status: true, data: OTP })
        }
    });
}


router.get('/getotpDetails/:id', function (req, res) {
    console.log('Message params', req.params);
    otpModel.find({ _id: req.params.id }, function (err, resp) {
        // otpModel.find({ UserID: 1 }, function (err, resp) {

        if (err) {
            res.send(err)
        } else {
            // console.log(' params', resp);
            res.send(resp)

            // res.send(resp)
        }
    });
});


router.post('/changeotp', function (req, res) {
    var data = req.body;
    registrationModel.find({ Username: req.body.Username }, function (erruser, respuser) {
        if (erruser) {
            res.send(erruser)
        } else {
            otpModel.find({ $and: [{ UserID: req.body.UserID }, { OTP: req.body.OTP }] }, function (err, resp) {
                if (err) {
                    res.send(err);
                } else {
                    console.log("jjjjjjj", respuser)
                    sendEmail(respuser, function (errrt, emaildata) {
                        if (errrt) {
                            res.send(errrt)
                        } else {
                            console.log("oottt", emaildata)
                            if (emaildata.status == true) {
                                console.log("hhhhhh", emaildata)

                                otpModel.update({ $and: [{ UserID: Number(resp[0].UserID) }, { OTP: Number(req.body.OTP) }] }, {
                                    $set: {
                                        'OTP': Number(emaildata.data)
                                    },
                                },
                                    function (errr, response) {
                                        if (errr) {
                                            res.send(errr)
                                            console.log("rreeupdateopt", errr)
                                        } else {
                                            console.log("rreeupdateopt", response)
                                            var otp = Number(emaildata.data);
                                            console.log("otpotp",otp)
                                            res.send({ status: true, data: otp })
                                        }
                                    })
                            } else {
                                console.log("nooooooooooo")
                                res.send(err)
                            }
                        }
                    })
                }
            })
        }
    })
})

router.post('/updates', function (req, res) {
    console.log('reqreq params', req.body[0].newPassword);
    // var data = createPassword(req.body.newPassword);
    tregistrationModel.update({ UserID: req.body[0].UserID }, {
        $set: {
            // 'Password': createPassword(req.body.newPassword)
            'Password': req.body[0].newPassword
            // 'Password': data

        }
    }, function (err, resp) {
        if (err) {
            res.send({ status: true, msg: "Error" });
        } else {
            res.send({ status: true, msg: "Password Updated Successfully" });
        }
    });
});

function createPassword(password) {
    console.log('jjjjkkk', password)
    return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
    // console.log('bcrypt.hashSync(password, bcrypt.genSaltSync(9));',bcrypt.hashSync(password, bcrypt.genSaltSync(9)))
}
// createPassword('pass@234')
module.exports = router;