const jwt = require("jsonwebtoken")

const auth = async(req,res,next)=>{
    const token = req.header("Authorization")?.replace("Bearer ","")
    if(!token){return res.status(401).json({message:"Access token required !"})}
    try{
        const decoded = jwt.verify(token,"secret")
        req.userId = decoded.id;
        next();
    }
    catch(err){
        return res.status(401).json({message:"Access token is expired or invalid !"})
    }
}
module.exports = auth;



// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODc2ZWU1NmE1YjQ4ODY2NzIzNTVlZDUiLCJlbWFpbCI6ImFtYW4xMjNAZ21haWwuY29tIiwiaWF0IjoxNzUyNjI1MDI2LCJleHAiOjE3NTI2Mjg2MjZ9.rJyoSiO74wwrAQWPy3B7klyF10TRtE2jUYXdF-dTfMs",
//   "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODc2ZWU1NmE1YjQ4ODY2NzIzNTVlZDUiLCJlbWFpbCI6ImFtYW4xMjNAZ21haWwuY29tIiwiaWF0IjoxNzUyNjI1MDI2LCJleHAiOjE3NTMyMjk4MjZ9.DLaHq5rYpHATba9LZbPP6Eqpewu6fY4tJIydwAkAsr4",