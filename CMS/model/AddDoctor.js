var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var DoctorSchema=new Schema({
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
    },
    treat:{
      type:String,
      require:true
    },
    treatDay:{
      type:String,
      require:true
    },
    startTime:{
      type:String,
      require:true
    },
    endTime:{
      type:String,
      require:true
    },
    count:{
      type:Number,
      require:true,
      default:1

    },
    percentage:{
      type:Number,
      require:true,
      default:1

    }
})
module.exports=mongoose.model('AddDoctors',DoctorSchema);
