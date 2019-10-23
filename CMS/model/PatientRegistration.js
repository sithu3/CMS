var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var PatientSchema=new Schema({
  name:{
    type:String,
    require:true
  },
  age:{
    type:String,
    require:true
  },
  date1:{
    type:String,
    require:true
  },
  gender:{
    type:String,
    require:true
  },
  married:{
    type:String,
    require:true
  },
  address:{
    type:String,
    require:true
  },
  phone:{
    type:String,
    require:true
  },
  date2:{
    type:String,
    require:true
  },
  blood:{
    type:String,
    require:true
  },
  complain:{
    type:String,
    require:true
  }
})
module.exports=mongoose.model('PatientRegistration',PatientSchema);
