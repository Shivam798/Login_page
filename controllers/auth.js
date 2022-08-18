const User =require("../models/User")
// const express=require("express");


exports.register= async(req,res,next)=>{
    const {username,email,password} = req.body;
    
    try {
        const user=await User.create({
          username,email,password  
        })
        res.status(201).json({
            success:true,
            user
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            error:error.message,
        })
        
        
    }



};

exports.login=async (req,res,next)=>{
    const {email,password} =req.body;
    if (!email || !password){
        // 404-bad request
        res.status(404).json({
            success:false,
            error : "Please provide email / password",
        })
    }
    try {
        const user= await User.findOne({email}).select("+password")
        if (!user){
            res.status(404).json({success:false,error:"Invalid Credentials"})
        }
        
        const isMatch = await  user.matchPasswords(password)
        if (!isMatch){
            res.status(404).json({
                success:false,error:'Invalid Credentials',
            })
        }
        res.status(200).json({
            success:true,
            token:"sfsdrtsfdh12434"
        })
    } catch (error) {
        // res.status(500).json({
        //     success:false,
        //     error:error.message
        // })
    }
};

exports.forgetpassword=(req,res,next)=>{
    res.send("Forget Password Route");
};

exports.resetpassword=(req,res,next)=>{
    res.send("Reset Password Route");
};