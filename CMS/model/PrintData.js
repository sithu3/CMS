var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var DBSchema=new Schema({
  name:{
    type:String,
    require:true
  },
  amount:{
    type:String,
    require:true
  }
});
module.exports=mongoose.model('PrintData',DBSchema)
