var express = require("express");
var router = express.Router();
const path = require('path');
const fs = require('fs');
var async = require("async");
var electionModel = require('../../model/electionModel')

router.get('/electionresult',function(req,res){
    electionModel.find({},function(err,response){
        if(err){
            res.send(err);
        }else{
            res.send(response);
        }
    }) 
})


module.exports= router;