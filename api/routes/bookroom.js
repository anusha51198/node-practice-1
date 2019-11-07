const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Room = require('../models/bookroom');

router.post('/', (req,res,next) => {

          const room = new Room({
            _id : new mongoose.Types.ObjectId(),
            name : req.body.name,
            numofpeople : req.body.numofpeople,
            checkindate : req.body.checkindate,
            checkoutdate : req.body.checkoutdate
          });
          room.save()
          .then(result => {
            console.log('Entered');
            const now = new Date();
            const nowday = now.getDate();
            const nowmonth = now.getMonth();
            const nowyear = now.getFullYear();

            const cindate = req.body.checkindate;
            const coutdate = req.body.checkoutdate;

            const cinmonth = parseInt(cindate.slice(0,2), 10);
            const cinday = parseInt(cindate.slice(3,5), 10)-1;
            const cinyear = parseInt(cindate.slice(6,10),10);

            const coutmonth = parseInt(coutdate.slice(0,2),10);
            const coutday = parseInt(coutdate.slice(3,5),10)-1;
            const coutyear = parseInt(coutdate.slice(6,10),10);


            console.log(result);
            res.status(200).json({
                message : 'Room Booked successfully'
            });

          })
          .catch(err => {
            console.log(err)
            res.staus(500).json({
              error : err
            });
          });


});



module.exports = router;
