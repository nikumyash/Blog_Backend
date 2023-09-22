const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        content:{
            type:String,
            required:true,
        },
        author:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        thumbnailImage:{
            type:String,
            default:""
        },
        url:{
            type:String,
            default:""
        },
    },
    {
        timestamps:true
    }
)
module.exports = mongoose.model("Post",postSchema);