var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DischargeSchema = new Schema({
  pid :{
    type: String, required: true
  },
  name :{
    type: String, required: true
  },
  doctor :{
    type: String, required: true
  },
  prescript:{
    type:String, required:true
  },
  payFee : {
    type:String, required:true
  }
});

module.exports = mongoose.model('dischargePatient',DischargeSchema);
