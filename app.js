const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

mongoose.connect('mongodb+srv://malayamanusha:anusha123@cluster0-kq5vz.mongodb.net/test?retryWrites=true&w=majority');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
//
// app.use((req,res,next) => {
//     res.status(200).json({
//         message : "It works"
//     });
// });


const userRoutes = require('./api/routes/user');
const bookroomRoutes = require('./api/routes/bookroom');

app.use('/user', userRoutes);
app.use('/bookroom', bookroomRoutes);


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if(req.method === 'OPTIONS')
    {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }
    next();
});


app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status(404);
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
      error: {
        message : error.message
      }
    });
});


module.exports = app;
