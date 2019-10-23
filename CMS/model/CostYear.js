var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var CostYearSchema=new Schema({
  peryear:{
    type:String,
    require:true
  },
  income:{
    type:String,
    require:true
  }
})
module.exports=mongoose.model('CostYear',CostYearSchema)
