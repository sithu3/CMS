var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var CostMonthSchema=new Schema({
  permonth:{
    type:String,
    require:true
  },
  income:{
    type:String,
    require:true
  }
})
module.exports=mongoose.model('CostMonth',CostMonthSchema)
