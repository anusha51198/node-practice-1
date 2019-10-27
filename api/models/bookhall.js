const mongoose = require('mongoose');

const hallSchema = mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  name : {type:String, required: true},
  bookingdate : {type:String, required: true}
});

module.exports = mongoose.model('Hall', hallSchema);
