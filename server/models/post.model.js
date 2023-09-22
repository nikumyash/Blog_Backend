const mongoose = require('mongoose');
const validator = require('validator');

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
            default:"",
        },
        views:{
            type:Number,
            default:0,
        },
        tags:[
            {
                type: String,
            }
        ]
    },
    {
        timestamps:true
    }
)
module.exports = mongoose.model("Post",postSchema);