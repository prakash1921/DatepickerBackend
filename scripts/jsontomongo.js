var express = require("express");
var router = express.Router();
const path = require('path');
const fs = require('fs');
var async = require("async");
const jsonData = require('../model/JsonDatamodel');
const JsonDataSingle = require('../model/JsonDatasinglemodel');

function datafromjsonfiletomogodb(){

    const directoryPath = path.join('','public/assets');
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        var count=1;
        var innercount=1;
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            // console.log(file); 
            const users = require("../public/assets" + "/" + file);
            var obj={};
            var a=file.split('.');
            // console.log('datafromjsonfiletomogodb',a[0])
            obj.ID=a[0];
            obj.Data=users;
           var savejsonData= new jsonData(obj);
           savejsonData.save(function(err,response){
               if(err){
                   console.log('err',err);
               }else{
                   console.log('done',count++);
                //    async.eachSeries(users,function(file,outercb){
                //     if(file){
                //         file.ID=a[0];
                //      var savejsonDatasingle= new JsonDataSingle(file);
                //      savejsonDatasingle.save(function(err,response){
                //          if(err){
                //              console.log('err',err);
                //          }else{
                //              console.log(' single done',innercount++);
                //              outercb();
                //          }
                //      })
                //     }else{
                //      outercb();
                //     }
                // },function(re,res){
                //     console.log('done single')
                // })
              
            }
           })
           
         
            // console.log('usersuser',users)
        });
    });
}

datafromjsonfiletomogodb();
module.exports= router;