const mongoose =require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    phoneno:{
        type:String,
        match:[/^\d{10}$/, "invalid phone number"]
    },
    password:{
        type:String,
        required:true
    }
});
module.exports = mongoose.model("User",userSchema);