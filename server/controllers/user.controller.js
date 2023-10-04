const mongoose = require('mongoose');
const User = require('../models/user.model')
const Post = require('../models/post.model')
const bcrypt = require("bcrypt")
const validator = require('validator');
const generateJWTandSetCookie = require("./../utils/generateJWT")
const cloudinary = require('cloudinary');
const uploadImg = require('./../utils/uploadImg')

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
            return res.json({success:false,error:"User already exists"});
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
        return res.status(200).json({
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
            return res.status(400).json({success:false,error:"Enter a valid email"});
        }
        const user = await User.findOne({email});
        const isPasswordValid = await bcrypt.compare(password , user?.password || "");
        if(!user || !isPasswordValid){
            return res.status(400).json({success:false,error:"Invalid email id or password"})
        }
        const token = generateJWTandSetCookie({name:user.name,email},res);
        return res.status(200).json({
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
        const {name,email,password,bio} = req.body;
        const profilePic = req.files.profilePic;
        if(email && !validator.isEmail(email)){
            return res.status(400).json({success:false,error:"Enter a valid email"});
        };
        let hPassword;
        if(password){
            const result = await bcrypt.compare(password,req.user.password);
            if(result)
                return res.status(400).json({success:false,error:"New password same as the previous one. Enter a new Password"});
            else{
                const salt = await bcrypt.genSalt(10);
                hPassword = await bcrypt.hash(password,salt)
            }
        }
        const user = await User.findOne({_id:req.user._id});

        user.name = name || user.name;
        user.bio = bio || user.bio;
        user.email = email || user.email;
        user.password = hPassword || user.password;
        
        let result;
        if(profilePic){
           result = await uploadImg(profilePic);
        } 
        user.profilePic = result.url || user.profilePic;
        await user.save();
        const token = generateJWTandSetCookie({name:user.name,email:user.email},res);
        return res.status(200).json({
            success:true,
            message:"User updated successfully",
            data:{
                username:user.name,
                email,
                profilePic:user.profilePic,
                token: token
            }
        });
    }
    catch(e){
        console.log('Error in update user : ',e.message);
        res.status(500).json({success:false,error:"Something went wrong!!!"});
    }
}

const getUserProfile = async (req,res)=>{ 
    try{
        const {query} = req.params;
        const user = await User.findOne({ name: query }).select({password:0,updatedAt:0,_id:0,__v:0,role:0}).populate({path:"posts",select:{_id:0,updatedAt:0,__v:0},options:{sort:'-createdAt',limit:6}});
        if(!user){
            return res.status(404).json({success:false,error:"User Not Found"});
        }
        return res.status(200).json({
            success:true,
            data:{
                user
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
        return res.status(200).json({ success:true,message: "User logged out successfully" });
    } catch (err) {
        res.status(500).json({success:false,error:"Something went wrong!!!"});
        console.log("Error in signupUser: ", err.message);
    }
}    

const getUserPosts = async (req,res)=>{
    try{
        const {user} = req.params;
        const {limit,offset,sort} = req.query;
        if(!user){
            return res.status(500).json({success:false,error:"Provide a user param"});
        }
        const userr = await User.findOne({name:user});
        if(!userr)return res.status(404).json({success:false,error:"User not found"});
        const posts = await Post.find({author:userr._id}).sort({createdAt:sort||'desc'}).skip(offset||0).limit(limit||10).select({updatedAt:0,_id:0,__v:0,author:0}); 
        return res.status(200).json({success:true,data:posts});
    }
    catch(e){
        res.status(500).json({success:false,error:"Something went wrong"});
        console.log("Error in getUserPost : ",e.message);
    }   
}

module.exports = {registerUser,loginUser,updateUser,logoutUser,getUserProfile,getUserPosts};



