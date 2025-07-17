const User = require ('../Model/user.model')
const bcrypt =require("bcryptjs")
const jwt = require("jsonwebtoken");
// const { use } = require("react");




exports.signup = async(req,res)=>{
    const {name,email,phoneNo, password} = req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    try{
        if(!name || !email || !phoneNo || !password){return res.status(400).json({message:"All fields are require !"})}
        const existingUser = await User.findOne({email});
        if(existingUser){return res.status(409).json({message:"This email already exist in system !"})}

        const user  = new User({name,email,phoneNo,password:hashedPassword})
        await user.save();
        res.status(201).json({
            message:"your account is successfully created !",
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                phoneNo:user.phoneNo,
                profilePic: user.profilePic,


        }})
    }
    catch(err){
        console.log("SignUp error : ",err);
        res.status(500).json({error:err.message})
    }
}

exports.login=async(req,res)=>{
    const {email , password} = req.body;
    try{
        if(!email || !password){return res.status(400).json({message:" email and password require for login"})}

        const user = await User.findOne({email});
        if(!user){return res.status(404).json({message:"this account is not exists !"})}

        const isMatch = await bcrypt.compare(password ,user.password);
        if(!isMatch){return res.status(401).json({message:"Invalid Credential"})}

        const token = await jwt.sign({_id:user._id,email:user.email},"secret",{expiresIn:"1hr"})
        const refreshToken = await jwt.sign({_id:user._id,email:user.email},"secret",{expiresIn:"7day"})
        // user.token =token,
        user.refreshToken =refreshToken,

        await user.save();
        res.status(200).json({
            message:"login Successfully",
            token,
            refreshToken,
            user:{
                id:user._id,
                name:user.name,
                email : user.email,
                profilePic: user.profilePic,
            },
        });
    }
    catch(err){
        console.error("Login error:", err);
        res.status(500).json({error:err.message})
    }
}


exports.refreshToken =async(req,res) =>{
   
        if(!req.body){return res.status(400).json({message:"Req body needed !"})}
        const{refreshToken} =req.body;
        
        if(!refreshToken){return res.status(400).json({message:"Refresh Token require "})}

     try{

        const decode  = jwt.verify(refreshToken,"secret");
        const user = await User.findOne(decode._id);
        if(!user || user.refreshToken !== refreshToken){
            return res.status(403).json({message:"Refresh token is invalid !"})
        }

        const newAccessToken  =  await jwt.sign({_id:user._id,email:user.email},"secret",{expiresIn:"1hr"})
        user.token =newAccessToken;
        await user.save();

        res.status(200).json({message:"New access token generated",token:newAccessToken})

    }
    catch(err){
        console.error("Refresh token error : " ,err)
        return res.status(401).json({message:"Refresh token is invalid or expired "})
    }
}




exports.logout = async(req,res) =>{
    try{
        const user = await User.findById(req.userId);
        user.token=null;
        user.refreshToken =null;
        await user.save();

        res.status(200).json({message:"Logout successfull"})
    }catch(err){
        console.error("Logout error:", err);
        res.status(500).json({error:err.message})
    }
}