const jwt = require('jsonwebtoken');

const generateJWT = (user)=>{
    const token =  jwt.sign(user,process.env.JWT_SECRET,{
        expiresIn:"3d"
    })
    return token;
}
// const generateJWTandSetCookie = (user,res)=>{
//     const token =  jwt.sign(user,process.env.JWT_SECRET,{
//         expiresIn:"3d"
//     })
//     res.cookie("token",token,{
//         maxAge: 3*24*60*60*1000,
//         sameSite:"strict",
//         httpOnly: true,
//     });
//     return token;
// }
module.exports = generateJWT;