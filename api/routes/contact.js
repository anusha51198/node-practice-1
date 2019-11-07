const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Contact = require('../models/contact');

router.post('/', (req,res,next) => {

  const contact = new Contact({
    _id : new mongoose.Types.ObjectId(),
    msg : req.body.msg,
    name : req.body.name,
    email : req.body.email,
    subject : req.body.subject
  });
  contact.save()
  .then(result => {

      console.log(result);
      res.status(200).json({
        message : 'Feedback sent successfully'
      });
  })
  .catch(err => {
    res.status(500).json({
      error : 'Failed to send feedback'
    });
  });

});




module.exports = router;
