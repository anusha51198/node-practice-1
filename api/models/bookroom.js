const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  name : {type:String, required: true},
  numofpeople : {type:Number, required: true},
  checkindate : {type:String, required: true},
  checkoutdate : {type:String, require: true}
});

module.exports = mongoose.model('Room', roomSchema);
