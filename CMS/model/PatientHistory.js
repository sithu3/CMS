var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var PatientSchema=new Schema({
  name:{
    type:String,
    require:true
  },
  disease:{
    type:String,
    require:true
  },
  medicine:{
    type:String,
    require:true
  },
  date:{
    type:String,
    require:true
  },
  doctor:{
    type:String,
    require:true
  }
})
module.exports=mongoose.model('PatientHistory',PatientSchema);
