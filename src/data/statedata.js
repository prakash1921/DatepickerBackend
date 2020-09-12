var express = require("express");
var router = express.Router();
const path = require('path');
const fs = require('fs');
var async = require("async");
const statemodel = require('../../model/statemodel');
const JsonDatamodel = require('../../model/JsonDatamodel');

var router = express.Router();

router.get('/province',function(req,res){
    statemodel.find({},function(err,response){
        if(err){
            res.send(err);
        }else{
            res.send(response);
        }
    }) 
})

router.get('/city/:id',function(req,res){
    JsonDatamodel.find({ID:req.params.id},function(err,response){
        if(err){
            res.send(err);
        }else{
            res.send(response);
        }
    }) 
})
module.exports= router;