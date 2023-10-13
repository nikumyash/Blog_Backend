const jwt = require('jsonwebtoken');

const generateAccessToken = (user)=>{
    const token =  jwt.sign(user,process.env.ACCESS_SECRET,{
        expiresIn:"6h"
    })
    return token;
}
const generateRefreshToken = (user,res)=>{
    const token =  jwt.sign(user,process.env.REFRESH_SECRET,{
        expiresIn:"3d"
    })
    res.cookie("refreshToken",token,{
        maxAge: 3*24*60*60*1000,
        sameSite:"strict",
        httpOnly: true,
        secure:true,
    });
}
module.exports = {generateAccessToken,generateRefreshToken};