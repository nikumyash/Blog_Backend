const mongoose = require('mongoose');
const Tag = require('../models/tag.model')

//should be tested
const getTagPosts = async (req,res)=>{
    try{
        const {query} = req.params;
        if(!query)return res.status(404).json({success:false,error:"Enter a valid query"})
        const tag = await Tag.aggregate([{
            $match:{tagName:query}
        },{
            $lookup:{
                from:"Post",
                localField:"posts",
                foreignField:"_id",
                as:"_posts"
            }
        }]);
        if(!tag)return res.status(404).json({success:false,error:"Enter a valid Tag"});
        const posts = tag.posts;
        return res.status(200).json({success:true,data:{posts:posts}})
    }catch(e){
        console.log('Error in register user : ',e.message);
        res.status(500).json({success:false,error:"Something went wrong!!!"});
    }
}

const fetchTags = async (req,res)=>{
    try{
        const tags = await Tag.find().sort({count:'desc'}.select('-_id').select('-posts'));
        res.status(200).json({success:true,data:{tags:tags}})
    }catch(e){
        console.log('Error in register user : ',e.message);
        res.status(500).json({success:false,error:"Something went wrong!!!"});
    }
}

module.exports = {fetchTags,getTagPosts};