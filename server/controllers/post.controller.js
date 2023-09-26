const mongoose = require("mongoose");
const User = require("./../models/user.model")
const Post = require("./../models/post.model");
const {v4 : uuid} = require('uuid');

const createPost = async (req,res)=>{
    try{
        const {title,content,thumbnailImage,tags} = req.body;
        if(!title && !content){
            return res.status(500).json({success:false,error:"Title and contents missing"});
        }
        const userid = req.user._id;
        const url = uuid();
        const post = new Post({
            title,content,thumbnailImage,tags,author:userid,url
        });
        const curpost = await post.save();
        const user = await User.findByIdAndUpdate(userid,{$push:{posts:curpost._id}});
        return res.json({success:true,message:"Post is created",data:{url:url}});

    }catch(e){
        res.status(500).json({success:false,error:"Something went wrong"});
        console.log("Error in createPost : ",e.message);
    }
}

const getPost = async (req,res)=>{
    try{
        const {id} = req.params;
        const post = await Post.findOne({url:id}).select({updatedAt:0,_id:0,__v:0}).populate("author",{password:0,updatedAt:0,_id:0,__v:0});
        if(!post)return res.status(404).json({success:false,error:"Post not found"});
        return res.status(200).json({success:true,data:post});

    }catch(e){
        res.status(500).json({success:false,error:"Something went wrong"});
        console.log("Error in createPost : ",e.message);
    }
}

const updatePost = async(req,res)=>{
    try{
        const {id} = req.params;
        const userid = req.user._id;
        const {title,content,thumbnailImage,tags} = req.body;
        if(!title && !content && !thumbnailImage && !tags ){
            return res.status(400).json({success:false,error:"Nothing to update"});
        }
        const post = await Post.findOne({url:id})
        if(!post)return res.status(404).json({success:false,error:"Post not found"});
        if(post.author.toString()!== userid.toString()){
            return res.status(400).json({success:false,error:"Cannot update other's post"});
        }
        post.title = title || post.title
        post.content = content || post.content
        post.thumbnailImage = thumbnailImage || post.thumbnailImage
        post.tags = tags || post.tags;
        await post.save();
        return res.json({success:true,message:"Post is updated"});
    }catch(e){
        res.status(500).json({success:false,error:"Something went wrong"});
        console.log("Error in createPost : ",e.message);
    }
}
const deletePost = async(req,res)=>{
    try{
        const {id} = req.params;
        const userid = req.user._id;
        const post = await Post.findOne({url:id})
        if(!post)return res.status(404).json({success:false,error:"Post not found"});
        if(post.author.toString()!== userid.toString()){
            return res.status(400).json({success:false,error:"Cannot delete other's post"});
        }
        await Post.deleteOne({_id:post.id});
        return res.json({success:true,message:"Post is deleted"});
    }
    catch(e){
        res.status(500).json({success:false,error:"Something went wrong"});
        console.log("Error in createPost : ",e.message);
    }   
}
const getFeed = async(req,res)=>{
    try{
        const {limit,offset,sort,user} = req.query;
        if(user){
            const userr = await User.findOne({name:user});
            if(!userr)return res.status(404).json({success:false,error:"User not found"});
            const posts = await Post.find({author:userr._id}).sort({createdAt:sort||'desc'}).skip(offset||0).limit(limit||10).select({updatedAt:0,_id:0,__v:0}); 
            return res.status(200).json({success:true,data:posts});
        }
        const posts = await Post.find().sort({createdAt:sort||'desc'}).skip(offset||0).limit(limit||10).select({updatedAt:0,_id:0,__v:0}).populate("author",{name:1,_id:0});
        if(!posts)return res.status(404).json({success:false,error:"Posts not found"});
        return res.status(200).json({success:true,data:posts});
    }
    catch(e){
        res.status(500).json({success:false,error:"Something went wrong"});
        console.log("Error in getFeed : ",e.message);
    }   
}
module.exports = {createPost,getPost,updatePost,deletePost,getFeed}