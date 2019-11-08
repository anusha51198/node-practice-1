const mongoose = require('mongoose');

const hallSchema = mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  name : {type:String, required: true},
  bookingdate : {type:String, required: true},
  requirement : {type:String, required:true},
  facilities : {type:Array, required: true}
});

module.exports = mongoose.model('Hall', hallSchema);
