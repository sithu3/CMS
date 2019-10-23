var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PrescriptSchema = new Schema({
  
  name:{
    type: String, required: true
  },
  disease:{
    type: String, required: true
  },
  prescript:{
    type: String, required: true
  },
  type:{
    type: String, required: true
  },
  insered:{
    type:Date,
    default:Date.now
  }

  // lab:{
  //   type: String, required: true
  // },
  // refer:{
  //   type: String, required: true
  // }
});
module.exports = mongoose.model('prescription',PrescriptSchema);
