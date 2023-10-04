const mongoose = require('mongoose');
const validator = require('validator');

const categorySchema = mongoose.Schema(
    {
        name:{
            type:String,
            unique:true,
            required:true,
            maxLength:50
        }
    },
    {
        timestamps:true
    }
)
module.exports = mongoose.model("Category",categorySchema);