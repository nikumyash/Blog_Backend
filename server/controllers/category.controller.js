const mongoose = require('mongoose');
const Category = require('../models/category.model')

//should be tested
const createCategory = async (req,res)=>{
    try{
        if(!req.user.role==='Admin'){
            return res.status(400).json({success:false,error:"Unauthorized"});
        }
        const {catName} = req.body.toLowerCase();
        const category = new Category({name:catName});
        await category.save();
        return res.status(200).json({success:true,message:"category successfully created"})
    }catch(e){
        console.log('Error in createCategory : ',e.message);
        res.status(500).json({success:false,error:"Something went wrong!!!"});
    }
}

const  getCategories = async (req, res) => {
    try {
      const categories = await Categories.find().sort("-createdAt").select({_id:0,name:1})
      res.status(200).json({ categories })
    } catch (err) {
        console.log('Error in getCategories : ',e.message);
        res.status(500).json({success:false,error:"Something went wrong!!!"});
    }
}

const  updateCategories = async (req, res) => {
    try {
        if(!req.user.role==='Admin'){
            return res.status(400).json({success:false,error:"Unauthorized"});
        }
        const {id} = req.params;
        const {name} = req.body;
        const categories = await Categories.findOneAndUpdate({_id:id},{name:name.toLowerCase()});
        return res.status(200).json({success:true,error:"Category updated successfully"})
    } catch (err) {
        console.log('Error in updateCategories : ',e.message);
        res.status(500).json({success:false,error:"Something went wrong!!!"});
    }
}

const  deleteCategories = async (req, res) => {
    try {
        if(!req.user.role==='Admin'){
            return res.status(400).json({success:false,error:"Unauthorized"});
        }
        const {id} = req.params;
        const categories = await Categories.deleteOne({_id:id});
        return res.status(200).json({success:true,error:"Category deleted successfully"})
    } catch (err) {
        console.log('Error in deleteCategories : ',e.message);
        res.status(500).json({success:false,error:"Something went wrong!!!"});
    }
}

const getPostsbyCategory = async(req,res)=>{
    try{
        const {cat} = req.params;
        const {limit,offset,sort} = req.query;
        const category = await Category.findOne({name:cat});
        if(!category){
            return res.status(404).json({success:false,error:"Category not found"});
        }
        const posts = await Post.find({category:category._id}).sort({createdAt:sort||'desc'}).skip(offset||0).limit(limit||10).select({updatedAt:0,_id:0,__v:0}).populate("author",{name:1,_id:0}).populate("category",{name:1,_id:0});
        if(!posts)return res.status(404).json({success:false,error:"Posts not found"});
        return res.status(200).json({success:true,data:posts});
    }
    catch(e){
        res.status(500).json({success:false,error:"Something went wrong"});
        console.log("Error in getPostsbyCategory : ",e.message);
    }   
}

module.exports = {createCategory,getCategories,updateCategories,deleteCategories,getPostsbyCategory};