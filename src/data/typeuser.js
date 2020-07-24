var express = require('express');
var router = express.Router();
const typeModel = require('../../model/typeusermodel');

var Hero= [
  { id: 11, name: 'Dr Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];

router.get('/userlist', function (req, res) {
    typeModel.find({UserName:"Prakash"}, function (erruser, respuser) {
        if(erruser){
            res.send(erruser)
        }else{
            console.log("type head resp",respuser);
            // res.send(respuser);
            res.send(Hero);
        }
    })
});
function getname(){
    typeModel.find({ },function(err,resp){
        if(err){
            console.log("err",err);
        }else{
            console.log("resp",resp)
        }
    })
}
// getname();

module.exports = router;