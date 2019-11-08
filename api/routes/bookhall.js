const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Hall = require('../models/bookhall');

router.post('/', (req,res,next) => {

  const hall = new Hall({
    _id : new mongoose.Types.ObjectId(),
    name : req.body.name,
    bookingdate : req.body.bookingdate,
    requirement : req.body.requirement,
    facilities : req.body.facilities
  });
  hall.save()
  .then(result => {
    console.log('Entered');
    const now = new Date();
    const nowday = now.getDate();
    const nowmonth = now.getMonth();
    const nowyear = now.getFullYear();

    const bookingdate = req.body.bookingdate;

    const bookingmonth = parseInt(bookingdate.slice(0,2), 10);
    const bookingday = parseInt(bookingdate.slice(3,5), 10)-1;
    const bookingyear = parseInt(bookingdate.slice(6,10),10);

    console.log(nowday , " ", nowmonth, " ", nowyear);
    console.log(bookingday, " ", bookingmonth, " ", bookingyear);

    if(bookingyear > nowyear || (bookingyear==nowyear && (bookingmonth>nowmonth || (bookingmonth==nowmonth && bookingday>nowday))))
    {
      console.log(result);
      res.status(200).json({
        message : 'Room Booked successfully'
      });

    }
    else{

        res.status(500).json({
          error : 'Booking Failed'
        });

    }
  })
  .catch(err => {
    res.status(500).json({
      error : 'Booking Failed'
    });
  });

});




module.exports = router;
