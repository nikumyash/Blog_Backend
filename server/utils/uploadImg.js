const {v2 : cloudinary}=require('cloudinary')
const fs = require('fs')

cloudinary.config({ 
  cloud_name:process.env.CLOUDINARY_CLOUDNAME, 
  api_key:process.env.CLOUDINARY_APIKEY, 
  api_secret:process.env.CLOUDINARY_API_SECRET 
});

const uploadImg = async (file)=>{
  try{
    const res = await cloudinary.uploader.upload(file.tempFilePath,{folder:"blog"})
    fs.unlink(file.tempFilePath,(err)=>{if(err)throw err;});
    return res;
  }catch(e){
    console.log("error in uploadImg :",e.message);
  }
};

module.exports = uploadImg