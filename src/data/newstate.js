var express = require("express");
var router = express.Router();
const path = require('path');
const fs = require('fs');
var async = require("async");
const newStateMode = require('../../model/newStateMode');
const newCityModel = require('../../model/newCityMode');

var router = express.Router();

router.get('/province/:eid',function(req,res){
    newStateMode.find({ElectionID:req.params.eid},function(err,response){
        if(err){
            res.send(err);
        }else{
            console.log("reponse",response)
            res.send(response);
        }
    }) 
});

router.get('/city/:id',function(req,res){
    newCityModel.find({cityID:req.params.id},function(err,response){
        if(err){
            res.send(err);
        }else{
            res.send(response);
        }
    })
})

module.exports= router;