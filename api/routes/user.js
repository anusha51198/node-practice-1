const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.post("/signup", (req,res,next) => {
  User.find({ email: req.body.email })
  .exec()
  .then(user => {
    if(user.length >= 1) {
      res.status(409).json({
          message : 'Mail exists'
      })
    }
    else {
          const user = new User({
            _id : new mongoose.Types.ObjectId(),
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            phone : req.body.phone
          });
          user.save()
          .then(result => {
            console.log(result);
            res.status(200).json({
                message : 'User Created'
            });
          })
          .catch(err => {
            console.log(err)
            res.staus(500).json({
              error : err
            });
          });
        }
    })

});



// User Login
router.post('/login', (req,res,next) => {
    User.find({email : req.body.email})
    .exec()
    .then( user => {
      if(user.length<1){
        return res.status(401).json({
          message : "Auth Failed"
        });
      }

      else if(req.body.password == user[0].password){

          const token = jwt.sign(
            {
              email : user[0].email,
              userId : user[0]._id
            },
            "secret",
            {
              expiresIn : "1h"
            }
          );

          return res.status(200).json({
            message : "Auth successful",
            token : token
          });
        }
        res.status(401).json({
          message : "Auth Failed"
        });

    })                   // user is an array
    .catch(err => {
      console.log(err);
      res.status(500).json({
          error : err
      });
    });
});


// Deleting users
router.delete(':/userId', (req,res,next) => {
    User.remove({ _id : req.params.userId})
    .exec()
    .then(res => {
      res.status(200).json({
        message : 'User deleted'
      });
    })
    .catch(err => {
      console.log(err);
      res.status(200).json({
        error : err
      });
    })
});


module.exports = router;
