const mongoose = require('mongoose');
const User = require('../models/user.model')
const Post = require('../models/post.model')
const bcrypt = require("bcrypt")
const validator = require('validator');
const jwt = require("jsonwebtoken")
const {generateAccessToken,generateRefreshToken} = require("./../utils/generateJWT")

const registerUser = async (req,res)=>{
    try{
        const {name,email,password} = req.body;
        if(!validator.isEmail(email)){
            return res.status(400).json({success:false,error:"Enter a valid email"});
        }
        if (!validator.matches(name, "^[a-zA-Z0-9_\.\-]*$")){
            return res.status(400).json({success:false,error:"Enter a valid username"});
        }
        if(!name || !email || !password){
            return res.status(400).json({success:false,error:"Either name, email id or password is missing"});
        }
        const x = await User.findOne({email});
        if(x){
            return res.status(403).json({success:false,error:"User already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hPassword = await bcrypt.hash(password,salt)
        const user = new User({
            name,
            email,
            password:hPassword,
        })
        const f_user = await user.save();
        const accessToken = generateAccessToken({name,email});
        generateRefreshToken({name,email},res);
        return res.status(200).json({
            success:true,
            message:"User registered successfully",
            data:{
                user:{
                    name,
                    email,
                    profilePic:f_user.profilePic,
                },
                accessToken
            }});
    }
    catch(e){
        console.log('Error in register user : ',e.message);
        res.status(500).json({success:false,error:"Something went wrong!!!"});
    }
}

const loginUser = async (req,res)=>{
    try{
        const {email,password} = req.body;
        if(!validator.isEmail(email)){
            return res.status(400).json({success:false,error:"Enter a valid email"});
        }
        const user = await User.findOne({email});
        const isPasswordValid = await bcrypt.compare(password , user?.password || "");
        if(!user || !isPasswordValid){
            return res.status(400).json({success:false,error:"Invalid email id or password"})
        }
        const accessToken = generateAccessToken({name:user.name,email});
        generateRefreshToken({name:user.name,email},res);
        return res.status(200).json({
            success:true,
            message:"User logged in successfully",
            data:{
                user:{
                    name:user.name,
                    email:user.email,
                    profilePic:user.profilePic
                },
                accessToken
            }});
    }catch(e){
        console.log('Error in loginUser: ',e.message);
        res.status(500).json({success:false,error:"Something went wrong!!!"});
    }
}

const refreshAccessToken = async (req,res)=>{
   try{
        const {refreshToken} = req?.cookies;
        if(!refreshToken)return res.status(401).json({success:false,message:"unauthorized"});
        const decoded = jwt.verify(refreshToken,process.env.REFRESH_SECRET);
        if(!decoded) return res.status(403).json({message:"forbidden"});
        const user = await User.findOne({name:decoded.name});
        if(!user)return res.status(401).json({success:false,message:"unauthorized"})
        const accessToken = generateAccessToken({name:user.name,email:user.email});
        return res.status(200).json({
            success:true,
            message:"User logged in successfully",
            data:{
                accessToken
            }});
   }catch(e){
        console.log('Error in refreshAccessToken : ',e.message);
        res.status(500).json({success:false,error:"Something went wrong!!!"});
   }
}

const logoutUser = async(req,res)=>{
    const {refreshToken} = req?.cookies;
    res.clearCookie("refreshToken",{httpOnly:true,sameSite:"None",secure:true});
    res.json({success:true,message:"Logged out successfully"});
}

module.exports = {registerUser,loginUser,refreshAccessToken,logoutUser}