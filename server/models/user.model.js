const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            unique:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            minLength:6,
            required:true,
        },
        profilePic:{
            type:String,
            default:"http://res.cloudinary.com/diuvszmko/image/upload/v1697118287/blog/krcksmlpiyyw6lfe7qxp.webp",
        },
        bio:{
            type:String,
            default:"",
        },
        role:{
            type:String,
            default:'reader',
        },
        posts:[
            {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post"
            },
        ]
    },
    {
        timestamps:true
    }
)
module.exports = mongoose.model("User",userSchema,"users");