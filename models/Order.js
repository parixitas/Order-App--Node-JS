var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
  name: String,
  price: String,
  status:String,
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Oder', OrderSchema);
