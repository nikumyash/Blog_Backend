

const isAuthenticated = async (req,res,next)=>{
    try{
        const token = req.cookies.token;
        if(!token){
            res.status(401).json({success:false,error:"Unauthorized"});
        };
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findById(decoded.email)
		req.user = user;
		next();
    }catch(e){
        console.log("Error in auth : ",e.message);
        res.status(401).json({success:false,error:"Unauthorized"});
    }
}


module.exports = isAuthenticated;