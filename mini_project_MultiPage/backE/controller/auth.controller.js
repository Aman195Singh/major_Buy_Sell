const express = require('express')
// const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User.model')

exports.signup = async(req, res) =>{
    try{
        const {name, email,phoneno,password} = req.body;

        const existUser = await User.findOne({email});
        if(existUser){return res.status(400).json({message:"this account already exists"})}

        const hashPassword = await bcrypt.hash(password,10);
        const user = new User({
            name,
            email,
            phoneno,
            password:hashPassword
        })
        await user.save();
        res.status(201).json({message:"User created successfully"})
     }catch(err){
        res.status(500).json({message:"signup failed",error:err.message})
     }
};

exports.login= async(req,res)=>{
    try{
        const{ email ,password}=req.body;
        const user = await User.findOne({email});
        if(!user){return res.status(401).json({message:"User  not found"}) };

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){return res.status(401).json({message:"Invalid credential"})};

        res.status(200).json({message:"User login successfully"})
    }
    catch(err){
        res.status(500).json({message:"Login failed", error:err.message})
    }
}