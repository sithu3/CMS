var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var PrintSchema=new Schema({
  pname:{
    type:String,
    require:true
  },
doctorname:{
    type:String,
    require:true
  },
date:{
      type:String,
      require:true
    },
suffer:{
        type:String,
        require:true
      },
treatmentcost:{
          type:String,
          require:true
        },
medicinecost:{
        type:String,
        require:true
                },
total:{
          type:String,
          require:true
        }
})
module.exports=mongoose.model('Print',PrintSchema)
