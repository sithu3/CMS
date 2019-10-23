var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PrescriptSchema = new Schema({
  pid:{
    type: String, required: true
  },
  name:{
    type: String, required: true
  },
  disease:{
    type: String, required: true
  },
  prescript:{
    type: String, required: true
  },
  treat:{
    type: String, required: true
  }
});
module.exports = mongoose.model('view_precription',PrescriptSchema);
