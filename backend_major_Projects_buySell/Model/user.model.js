const mongoose = require("mongoose")



const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowecase:true,
        trim:true
    },
    phoneNo:{
        type:String,
        match:[/^\d{10}$/ , "please  fill valid 10 digits phone no."],
    },
    password:{
        type:String,
        required:true,
        minlength : [6,"password atleast 6 digits"]
    },
    token:{
        type:String,
        // required:true,
    },
    refreshToken:{
        type:String
    },
    profilePic:{
        type:String,
        default:"https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg",
    },
    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }],
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }],



},{timestamps:true})


module.exports = mongoose.model("User", userSchema);