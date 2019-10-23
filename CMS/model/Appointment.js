var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var AppointmentSchema = new Schema({
  name:{
    type: String, require: true
  },
  address:{
    type: String, require: true
  },
  city:{
    type: String, require: true
  },
  state:{
    type: String, require: true
  },
  primary_ph:{
    type: String, require: true
  },
  secondary_ph:{
    type: String, require: true
  },
  email:{
    type: String, require: true
  },
  date_of_birth:{
    type: String, require: true
  },
  day:{
    type: String, require: true
  },
  time:{
    type: String, require: true
  },
  doctor:{
    type: String, require: true
  },
  treat:{
    type: String, require: true
  },
  day_treat:{
    type: String, require: true
  },
  day_type:{
    type: String, require: true
  }
});

module.exports = mongoose.model('appointment',AppointmentSchema);
