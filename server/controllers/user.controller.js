const mongoose = require('mongoose');
const User = require('../models/user.model')
const Post = require('../models/post.model')
const bcrypt = require("bcrypt")
const validator = require('validator');
const jwt = require("jsonwebtoken")
const {generateAccessToken,generateRefreshToken} = require("./../utils/generateJWT")
const cloudinary = require('cloudinary');
const uploadImg = require('./../utils/uploadImg')


const updateUser = async (req,res)=>{
    try{
        const {name,email,password,bio} = req.body;
        const profilePic = req?.files?.profilePic;
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
        user.profilePic = result?.url || user.profilePic;
        await user.save();
        const accessToken = generateAccessToken({name:user.name,email:user.email});
        generateRefreshToken({name:user.name,email:user.email},res);
        return res.status(200).json({
            success:true,
            message:"User updated successfully",
            data:{
                accessToken
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
        const refreshtoken = req?.cookies?.["refreshToken"];
        let decoded;
        if(refreshtoken){
            try{
                decoded = jwt.verify(refreshtoken,process.env.REFRESH_SECRET);
            }catch(e){}
        }
        const user = await User.findOne({ name: query }).select({password:0,updatedAt:0,_id:0,__v:0,role:0}).populate({path:"posts",select:{_id:0,updatedAt:0,__v:0},options:{sort:'-createdAt',limit:20}});
        if(!user){
            return res.status(404).json({success:false,error:"User Not Found"});
        }
        return res.status(200).json({
            success:true,
            data:{
                user:{
                    ...user._doc,
                    isEditable:decoded?.name===user?.name
                }                
            }
        })
    }catch(e){
        console.log('Error in find User : ',e.message);
        res.status(500).json({success:false,error:"Something went wrong!!!"});
    }
}

// const getUserPosts = async (req,res)=>{
//     try{
//         const {user} = req.params;
//         const {limit,offset,sort} = req.query;
//         if(!user){
//             return res.status(500).json({success:false,error:"Provide a user param"});
//         }
//         const userr = await User.findOne({name:user});
//         if(!userr)return res.status(404).json({success:false,error:"User not found"});
//         const posts = await Post.find({author:userr._id}).sort({createdAt:sort||'desc'}).skip(offset||0).limit(limit||10).select({updatedAt:0,_id:0,__v:0,author:0}); 
//         return res.status(200).json({success:true,data:posts});
//     }
//     catch(e){
//         res.status(500).json({success:false,error:"Something went wrong"});
//         console.log("Error in getUserPost : ",e.message);
//     }   
// }

module.exports = {updateUser,getUserProfile};



