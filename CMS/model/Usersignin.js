var mongoose= require('mongoose');
var Schema= mongoose.Schema;

var UserSignIn=new Schema({

email:{
  type:String,
  required:true
},

password:{
  type:String,
  required:true
}

})

module.exports = mongoose.model('Usersignin',UserSignIn);
