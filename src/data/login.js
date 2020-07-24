var express = require('express');
var router = express.Router();
const userModel = require('../../model/usermodel')
const roleModel = require('../../model/rolemodel')
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

router.post('/login',function(req,res){
    console.log('llllll',req.body)
    if(!req.body.username || !req.body.password){
        return res.status(400).send('argument missing');
    }else{
        try{
            userModel.find({$and:[{isActive:true},{Username:req.body.username},{Rowstatus:0}]},(err,response) => {
                console.log('trrrr',response)
                if(response == null){
                    return res.send({status:false,message:'Invalid UserName'});
                }else{
                    console.log("user data",response)
                    roleModel.find({$and:[{RoleID:response.RoleID},{RowStatus:0}]},(errr,respo) => {
                        if(respo == null){
                            return res.send({status:false,message:'The User Does Not Have Rights'});
                        } else{
                            userModel.find({_id:response._id},(err,results) =>{
                                if(err){
                                    res.send(err);
                                }else{
                                    roleModel.find({RoleID:response.RoleID},(errrr,role) =>{
                                        if(err){
                                            res.send(err);
                                        }
                                        else
                                        {
                                            console.log(" ggg",req.body.password,"tttttttt",response.password)
                                        const result = bcrypt.compareSync(req.body.password,response.password);
                                        if(result){
                                            console.log("last",response)
                                            const userObject = response.toObject();
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
                                            Admin:response,
                                            roleData:role
                                        });
                                    }else{
                                        console.log("gggggggggggg")
                                        return res.send({status:false,message:"Incorrect Password"});
                                    }
                                        }
                                    });
                                   
                                }
                            })
                        }
                    })
                }
            })
        }
        catch (err){
            res.status(400).send(error);
        }
    }
})

module.exports = router;
