const mongoose = require('mongoose');
const User = require('../models/user.model')
const Post = require('../models/post.model')
const bcrypt = require("bcrypt")
const validator = require('validator');
const generateJWTandSetCookie = require("./../utils/generateJWT")

const registerUser = async (req,res)=>{
    try{
        const {name,email,password} = req.body;
        if(!validator.isEmail(email)){
            res.status(400).json({success:false,error:"Enter a valid email"});
        }
        if (!validator.matches(name, "^[a-zA-Z0-9_\.\-]*$" && nameMatch)){
            res.status(400).json({success:false,error:"Enter a valid username"});
        }
        if(!name || !email || !password){
            res.status(400).json({success:false,error:"Either name, email id or password is missing"});
        }
        const x = await User.findOne({email});
        if(x){
            res.json({success:false,error:"User already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hPassword = await bcrypt.hash(password,salt)
        const user = new User({
            name,
            email,
            password:hPassword,
        })
        await user.save();
        const token = generateJWTandSetCookie({name,email},res);
        res.status(200).json({
            success:true,
            message:"User registered successfully",
            data:{
                username:user.name,
                email,
                profilePic:user.profilePic,
                token: token
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
            res.status(400).json({success:false,error:"Enter a valid email"});
        }
        const user = await User.findOne({email});
        const isPasswordValid = await bcrypt.compare(password , user?.password || "");
        if(!user || !isPasswordValid){
            res.status(400).json({success:false,error:"Invalid email id or password"})
        }
        const token = generateJWTandSetCookie({name:user.name,email},res);
        res.status(200).json({
            success:true,
            message:"User logged in successfully",
            data:{
                username:user.name,
                email,
                profilePic:user.profilePic,
                token: token
            }});
    }catch(e){
        console.log('Error : ',e.message);
        res.status(500).json({success:false,error:"Something went wrong!!!"});
    }
}
const updateUser = async (req,res)=>{
    try{
        const {id} = req.params
        const {name,email,password,profilePic,bio} = req.body;
        if(!validator.isEmail(email)){
            res.status(400).json({success:false,error:"Enter a valid email"});
        };
        if(id!==req.user.name){
            res.status(400).json({success:false,error:"Cannot update others profile"});
        }
        if(password){
            const res = await bcrypt.compare(password,req.user.password);
            if(res)res.status(400).json({success:false,error:"New password same as the previous one. Enter a new Password"});
        }
        const user = await User.findOne({_id:req.user._id});
        const salt = await bcrypt.genSalt(10);
        const hPassword = await bcrypt.hash(password,salt)

        user.name = name || user.name;
        user.bio = bio || user.bio;
        user.email = email || user.email;
        user.profilePic = profilePic || user.profilePic;
        user.password = hPassword || user.password;

        await user.save();
        const token = generateJWTandSetCookie({name:user.name,email:user.email},res);
        res.status(200).json({
            success:true,
            message:"User updated successfully",
            data:{
                username:user.name,
                email,
                profilePic:user.profilePic,
                token: token
            }});
    }
    catch(e){
        console.log('Error in update user : ',e.message);
        res.status(500).json({success:false,error:"Something went wrong!!!"});
    }
}

const getUserProfile = async (req,res)=>{
    try{
        const {query} = req.params;
        const user = await User.findOne({ name: query }).select("-password").select("-updatedAt").select("-_id");
        if(!user){
            res.status(404).json({success:false,error:"User Not Found"});
        }
        const posts = await Post.findMany({author:user._id}).select("-updatedAt").select("-_id")
        res.status(200).json({
            success:true,
            data:{
                ...user,
                posts:posts
            }
        })
    }catch(e){
        console.log('Error in find User : ',e.message);
        res.status(500).json({success:false,error:"Something went wrong!!!"});
    }
}

const logoutUser = (req, res) => {
    try {
        res.cookie("token", "", { maxAge: 1 });
        res.status(200).json({ success:true,message: "User logged out successfully" });
    } catch (err) {
        res.status(500).json({success:false,error:"Something went wrong!!!"});
        console.log("Error in signupUser: ", err.message);
    }
}    


module.exports = {registerUser,loginUser,updateUser,logoutUser,getUserProfile};



