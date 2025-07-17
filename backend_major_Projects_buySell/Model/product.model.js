const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
  name :{
    type:String,
    required:true,
    trim:true
  },
  category:{
    type:String,
    required:true
  },
  description:{
    type :String,
    required:true
  },
  image:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true,
    min:0
  },
  postedBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  availibility:{
    type:Boolean,
    default:true
  }

},{timestamps: true})

module.exports = mongoose.model("product",productSchema)