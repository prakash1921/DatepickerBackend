var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const loginapi = require('../src/data/login');
const registration = require('../src/data/registration');
const otp = require('../src/data/otp');
const usertype = require('../src/data/typeuser')
const userdate = require('../src/data/dateuser');
const fileuploads = require('../src/data/fileupload');
const roles = require('../src/data/newrole')
const userRights =require('../src/data/userRights');
const hospitallocation = require('../src/data/hospitallocation')
 router.use('/loginapi',loginapi);
 router.use('/registration',registration);
 router.use('/otp',otp);
 router.use('/usertype',usertype);
 router.use('/userdate',userdate);
 router.use('/fileuploads',fileuploads);
 router.use('/roles',roles);
 router.use('/userRights',userRights);
 router.use('/hospitallocation',hospitallocation);

 




module.exports = router;
