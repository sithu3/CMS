var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var ReceptionSchema=new Schema({
  patientid:{
    type:String,
    require:true
  },
  name:{
    type:String,
    require:true
  },
  address:{
    type:String,
    require:true
  },
  phno:{
    type:String,
    require:true
  }
})
module.exports=mongoose.model('AddReception',ReceptionSchema);
