var mongoose =require('mongoose')
var Schema =mongoose.Schema;
var UserSchema=new Schema({
  medicine:{
    type:String,
    required:true
  },
  cost:{
    type:String,
    required:true
  }
})
module.exports=mongoose.model('expense',UserSchema)
