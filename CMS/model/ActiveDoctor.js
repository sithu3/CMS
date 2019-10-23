var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var DoctorSchema=new Schema({
  doctor:{
    type:String,
    require:true
  },
  active:{
    type:String,
    require:true
  }
})
module.exports=mongoose.model('ActiveDoctor',DoctorSchema);
