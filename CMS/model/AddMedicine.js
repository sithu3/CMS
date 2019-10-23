var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var MedicineSchema=new Schema({
  name:{
    type:String,
    require:true
  },
  treat:{
    type:String,
    require:true
  },
  price:{
    type:String,
    require:true
  }
})
module.exports=mongoose.model('AddMedicine',MedicineSchema)
