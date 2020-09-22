var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// const loginapi = require('../src/data/login');
// const registration = require('../src/data/registration');
// const otp = require('../src/data/otp');
// const usertype = require('../src/data/typeuser')
// const userdate = require('../src/data/dateuser');
const fileuploads = require('../src/data/fileupload');
const exceldata = require('../src/data/exceldata');
const jsontomongo = require('../scripts/jsontomongo')
const statescript = require('../scripts/statescript')
const state = require('../src/data/statedata')
const electionscript = require('../scripts/electionscript');
const election =require('../src/data/election');
const newstate =require('../src/data/newstate')

// const roles = require('../src/data/newrole')
// const userRights =require('../src/data/userRights');
// const hospitallocation = require('../src/data/hospitallocation')
// const imagtotext = require('../src/data/imagtotext')


//  router.use('/loginapi',loginapi);
//  router.use('/registration',registration);
//  router.use('/otp',otp);
//  router.use('/usertype',usertype);
//  router.use('/userdate',userdate);
 router.use('/fileuploads',fileuploads);
 router.use('/exceldata',exceldata);
 router.use('/jsontomongo',jsontomongo);
 router.use('/electionscript',electionscript);
 router.use('/statescript',statescript);
 router.use('/state',state);
 router.use('/election',election);
 router.use('/newstate',newstate);




//  router.use('/roles',roles);
//  router.use('/userRights',userRights);
//  router.use('/hospitallocation',hospitallocation);
//  router.use('/imagtotext',imagtotext);

 

 




module.exports = router;
