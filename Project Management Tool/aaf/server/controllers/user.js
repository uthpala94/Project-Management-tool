const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser =  (req,res,next)=>{
    User.find({email: req.body.email})
    .exec()
    .then(user =>{
        if(user.length >=1){
            return res.status(409).json({
                message:'Entered email is exists!'
            });
        }else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    return res.status(500).json({
                        error:err
                    });
                }else{
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        name:req.body.name,
                        email: req.body.email,
                        password: hash
                    });
                    user
                    .save()
                    .then(result =>{
                        console.log(result);
                        res.status(201).json({
                            message:'User Created...'
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error:err
                        });
                    });
                }
            })
          
        }
    })

}



exports.loginUser = (req,res,next)=>{
    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length<1){
            return res.status(401).json({
                message:'Authentication failed'
            });
        }
        bcrypt.compare(req.body.password, user[0].password,(err,result)=>{
            if(err){
                return res.status(401).json({
                    message:'Authentication failed'
                });
            }
            if(result){
                const tok = jwt.sign({
                    email:user[0].email,
                    userId:user._id
                },"seceret",{
                    expiresIn:"1h"
                })
                return res.status(200).json({
                    token:tok,
                    user:{
                        userId:user[0]._id,
                        name:user[0].name
                        

                    },
                    message:'Authentication successful'
                });      
            }
            res.status(401).json({
                message:'Authentication failed'
            });


        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });

}

exports.deleteUser = (req,res,next)=>{
    User.remove({_id:req.params.userId})
    .exec()
    .then(result =>{
        res.status(200).json({
            message:"User deleted..."
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
}


exports.findUser = function(req,res){
    const N = req.params.name;
    User.find().or([{name:new RegExp(N,'i')},{email:new RegExp(N,'i')}]).select('_id name email')
    .exec()
    .then(doc=>{
        if(doc){
            res.json(doc);
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    })
 }