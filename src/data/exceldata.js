var express = require("express");
var router = express.Router();

var express = require("express");
var router = express.Router();
var parser = require("simple-excel-to-json");
// var doc = parser.parseXls2Json("./public/examples.xls");
var async = require("async");
var _ = require('lodash')
var studentmodel = require('../../model/studentmodel')
function getfun() {
  console.log(doc[0].length);
  var legendName = [];
  var TotalData=0;
  var labelarray=[];
  console.log("doc[0]",doc[0].length)
  async.eachSeries(doc[0], function (file, cb) {
    if (file) {
      console.log("asssy", file);
      var Obj = {
        Polling_Station_Number: (file.Polling_Station_Number).toString(),
      };
      var Obj1={
        Chris_Alexander:file.Chris_Alexander,
        Stephanie_Brown:file.Stephanie_Brown,
        Jeff_Hill:file.Jeff_Hill,
        Mark_Holland:file.Mark_Holland,
        Bob_Kesic:file.Bob_Kesic
      }
      labelarray.push(Object.keys(Obj1))
      // TotalData+=file.Total_Votes;
      legendName.push(Object.values(Obj));
      cb();
      OBj = {};
      Obj1={};
    } else {
      cb();
    }
  },
    function (err, resp) {
      var legend=  _.flatten(legendName);
      // console.log("Lagend Name",legend);
     var newvalue= _.drop(legend, 198);
     console.log("doc[0]",newvalue)
      console.log("doc[0]",doc[0].length)
      // console.log("TotalData",TotalData)
      var labelvalue=  _.flatten(labelarray);
      var uniqdata=_.uniq(labelvalue);
      console.log("labelarraylabelarray",uniqdata)
    });
}
// getfun();
module.exports = router;
var ddd=['1',    '2',  '3',  ' 4A', ' 4B', '5',    '6',    '7',
'8',    '9',  '10', '11',  '12',  ' 13A', ' 13B', '14',
'15',   '16', '17', '18',  '19',  '20',   '21',   ' 22A',
' 22B', '23', '24', '25',  '26',  '27',   ' 28A', ' 28B',
'29',   '30', '31', '32',  '33',  '34',   '35',   '36',
'37',   '38', '39', '40',  '41',  '42',   '43',   '44',
'45',   '46', '47', '48',  '49',  '50',   '51',   '52',
'53',   '54', '55', '56',  '57',  '58',   '59',   '60',
'61',   '62', '63', '64',  '65',  '66',   '67',   ' 68A',
' 68B', '69', '70', '71',  '72',  '73',   '74',   '75',
'76',   '77', '78', '79',  '80',  '81',   '82',   '83',
'84',   '85', '86', '87',  '88',  '89',   '90',   ' 91A',
' 91B', '92', '93', '94',  '95',  '96',  '97',  '98',    '99',    '100',
'101', '102', '103', '104', '105',   '106',   '107',
'108', '109', '110', '111', '112',   '113',   '114',
'115', '116', '117', '118', '119',   '120',   '121',
'122', '123', '124', '125', '126',   '127',   '128',
'129', '130', '131', '132', '133',   '134',   '135',
'136', '137', '138', '139', '140',   '141',   '142',
'143', '144', '145', '146', '147',   '148',   '149',
'150', '151', '152', '153', '154',   '155',   '156',
'157', '158', '159', '160', '161',   '162',   '163',
'164', '165', '166', '167', ' 168A', ' 168B', '169',
'170', '171', '172', '173', '174',   '175',   '176',
'177', '178', '179', '180', '181',   '182',   '183',
'184', '400', '401', '402', '403',   '404',   '500',
'501', '600',, '601', '602',
'603', '604', '605',
'606', '607', '608',
'609', '610', '611',
'612', '',    ''
]
// console.log(ddd.replace(/''/g, '"'))
// var minified = JSON.stringify(ddd.toString());
console.log("ddfffffffffffffd",ddd)
router.post('/getdata',function(req,res){
    var data=[5,5,5,5,877,4,4,8,1,7,1,5,7,4,7,4,4,5,7,7,8]
            res.send(data);
        
});

   router.post('/exceldata',function(req,res){
    var filepath= "F:\\Project\\Practiceapptment\\Election\\Election_node\\public\\Excel\\" + req.body.filename;
    var docarry = parser.parseXls2Json(filepath);
    console.log("docarry[0]",docarry[0])
  res.send(docarry[0])
        
});
  

function student(){
  var obj={};

  obj.ID=1;
  obj.Age=25;
  obj.Address="hjbdshf";
  obj.city="ass dwd"
  var studentdata = new studentmodel(obj);
  studentdata.save(function(err,response){
    if(err){
        console.log('err',err);
    }else{
        console.log(' inserted done');
        
    }

})
}
student()
module.exports= router;