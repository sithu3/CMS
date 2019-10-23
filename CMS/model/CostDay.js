var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var CostSchema=new Schema({
  perday:{
    type:String,
    require:true
  },
  income:{
    type:String,
    require:true
  }
})
module.exports=mongoose.model('CostDay',CostSchema)
