const mongoose=require("mongoose")
const movie=new mongoose.Schema({
    name:{type:String},
    img:{type:String},
    year:{type:Number},
  
    genre:[String],
    rating:{type:Number}

})
module.exports=mongoose.model("movue",movie)