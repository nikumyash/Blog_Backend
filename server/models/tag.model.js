const mongoose = require('mongoose');
const validator = require('validator');

const tagSchema = mongoose.Schema(
    {
        tagName:{
            type:String,
            unique:true,
            required:true,
        },
        count:{
            type:Number,
            default:0,
        },
        posts:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Post"
            }
        ]
    },
    {
        timestamps:true
    }
)
module.exports = mongoose.model("Tag",tagSchema);