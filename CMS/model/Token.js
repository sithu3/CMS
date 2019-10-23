var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var TokenSchema=new Schema({
  patientName:{
    type:String,
    require:true
  },
    doctorName:{
    type:String,
    require:true
  },
  desease:{
    type:String,
    require:true
  },
  date:{
    type:String,
    require:true
  },
  countToken:{
    type:Number,
    require:true,
    default:1
  },
  insered:{
    type:Date,
    default:Date.now
  }
})
module.exports=mongoose.model('Token',TokenSchema);
