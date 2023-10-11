const jwt = require("jsonwebtoken")
const User = require('../models/user.model')

const isAuthenticated = async (req,res,next)=>{
    try{
        const token = req.headers["x-access-token"];
        if(!token){
            return res.status(401).json({success:false,error:"Unauthorized"});
        };
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findOne({email:decoded.email})
		req.user = user;
		next();
    }catch(e){
        console.log("Error in auth : ",e.message);
        res.status(401).json({success:false,error:"Unauthorized"});
    }
}


module.exports = isAuthenticated;