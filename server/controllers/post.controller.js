const mongoose = require("mongoose");
const User = require("./../models/user.model")
const Post = require("./../models/post.model");
const {v4 : uuid} = require('uuid');
const cloudinary = require('cloudinary');
const uploadImg = require('./../utils/uploadImg');
const Category = require("../models/category.model");

const createPost = async (req,res)=>{
    try{
        const {title,content,category} = req.body;
        const thumbnailImage = req.files?.thumbnail;
        let result;
        if(thumbnailImage){
            result = await uploadImg(thumbnailImage);
        }
        if(!title && !content && !category){
            return res.status(500).json({success:false,error:"Title or contents or Category missing"});
        }
        const fcategory = await Category.findOne({name:category});
        if(!fcategory){
            return res.status(400).json({success:false,error:"Enter the correct category"});
        } 
        const userid = req.user._id;
        const url = uuid();
        const post = new Post({
            title,content,thumbnailImage:result?.url,category:fcategory._id,author:userid,url
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
        const post = await Post.findOne({url:id}).select({updatedAt:0,_id:0,__v:0}).populate("author",{password:0,updatedAt:0,_id:0,__v:0,role:0,createdAt:0,posts:0}).populate("category",{_id:0,name:1});
        if(!post)return res.status(404).json({success:false,error:"Post not found"});
        return res.status(200).json({success:true,data:post});

    }catch(e){
        res.status(500).json({success:false,error:"Something went wrong"});
        console.log("Error in getPost : ",e.message);
    }
}

const updatePost = async(req,res)=>{
    try{
        const {id} = req.params;
        const userid = req.user._id;
        const {title,content,category} = req.body;
        const thumbnailImage = req.files.thumbnail;

        if(!title && !content && !thumbnailImage && !tags ){
            return res.status(400).json({success:false,error:"Nothing to update"});
        }
        let fcategory;
        if(category){
            fcategory = await Category.findOne({name:category});
            if(!fcategory){
                return res.status(400).json({success:false,error:"Enter the correct category"});
            } 
        }
        let result;
        if(thumbnailImage){
            result = await uploadImg(thumbnailImage);
        }

        const post = await Post.findOne({url:id})
        if(!post)return res.status(404).json({success:false,error:"Post not found"});
        if(post.author.toString()!== userid.toString()){
            return res.status(400).json({success:false,error:"Cannot update other's post"});
        }

        post.title = title || post.title
        post.content = content || post.content
        post.thumbnailImage = result.url || post.thumbnailImage
        post.category = fcategory._id || post.category;
        await post.save();
        return res.json({success:true,message:"Post is updated"});
    }catch(e){
        res.status(500).json({success:false,error:"Something went wrong"});
        console.log("Error in updatePost : ",e.message);
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
        console.log("Error in deletePost : ",e.message);
    }   
}
const getFeed = async(req,res)=>{
    try{
        const posts = await Post.aggregate([
            {$lookup:{
                from:"users",
                localField:"author",
                foreignField:"_id",
                as:"author"
            }},
            {$project:{author:{
                updatedAt:0,
                _id:0,
                __v:0,
                password:0,
                email:0,
                bio:0,
                role:0,
                posts:0,
                createdAt:0,
            }}},
            {$lookup:{
                from:"categories",
                localField:"category",
                foreignField:"_id",
                as:"category"
            }},
            {$project:{category:{
                updatedAt:0,
                _id:0,
                __v:0,
                createdAt:0
            }}},
            {$unwind:"$author"},
            {$unwind:"$category"},
            {$project:{updatedAt:0,_id:0,__v:0}},
            {$sort:{createdAt:sort||1}},
            {$group:{
                _id:"$category.name",
                name:{$first:"$category.name"},
                posts:{$push:"$$ROOT"},
                count:{$sum:1}
            }},
            {
                $project: {
                  posts: {
                    $slice: ['$posts', 0, 4]
                  },
                  count: 1,
                  name:1
                }
            }
        ]);
        if(!posts)return res.status(404).json({success:false,error:"Posts not found"});
        return res.status(200).json({success:true,data:posts});
    }
    catch(e){
        res.status(500).json({success:false,error:"Something went wrong"});
        console.log("Error in getFeed : ",e.message);
    }   
}




module.exports = {createPost,getPost,updatePost,deletePost,getFeed}