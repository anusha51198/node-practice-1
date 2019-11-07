const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  msg : {type:String, required: true},
  name : {type:String, required: true},
  email : {type:String, required: true},
  subject : {type:String, require: true}
});

module.exports = mongoose.model('Contact', contactSchema);
