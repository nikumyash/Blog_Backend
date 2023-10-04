// const router = require('express').Router()
// const Post = require('./../models/post.model');


// // incomplete
// const getFeedOther = async(req,res)=>{
//     try{
//         const {limit,offset,sort,search} = req.query;
//         const posts = await Post.aggregate([
//             {$text:{$search:search}},
//             {$lookup:{
//                 from:"users",
//                 localField:"author",
//                 foreignField:"_id",
//                 as:"author"
//             }},
//             {$project:{author:{
//                 updatedAt:0,
//                 _id:0,
//                 __v:0,
//                 password:0,
//                 email:0,
//                 bio:0,
//                 role:0,
//                 posts:0,
//                 createdAt:0,
//             }}},
//             {$lookup:{
//                 from:"categories",
//                 localField:"category",
//                 foreignField:"_id",
//                 as:"category"
//             }},
//             {$project:{category:{
//                 updatedAt:0,
//                 _id:0,
//                 __v:0,
//                 createdAt:0
//             }}},
//             {$unwind:"$author"},
//             {$unwind:"$category"},
//             {$project:{updatedAt:0,_id:0,__v:0}},
//             {$sort:{createdAt:sort||1}},
//         ]);
//         if(!posts)return res.status(404).json({success:false,error:"No Posts found"});
//         return res.status(200).json({success:true,data:posts});
//     }
//     catch(e){
//         res.status(500).json({success:false,error:"Something went wrong"});
//         console.log("Error in getFeed : ",e.message);
//     }   
// }
// router.get('/search',getFeedOther);

// module.exports = router;