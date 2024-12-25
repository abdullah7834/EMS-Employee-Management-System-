 import jwt from 'jsonwebtoken'
import User from '../models/User.js'
 const verifyUser  = async (req ,  res , next) =>{

    try {
        const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, error: "Authorization header missing" });
    }
        const token  = authHeader.split(" ")[1];
        if(!token){
            res.status(404).json({success : false  , error : "token  not found"})
        }

    const decoded  = jwt.verify(token , process.env.JWT_SECRET)
    if(!decoded) {
        res.status(401).json({success : false  , error : "TOken  not valid"})
    }

    const user   = await User.findById({_id : decoded._id}).select('-password')
    if(!user){
        res.status(404).json({success : false  , error : "User not found"})
    }
    req.user  = user ;
    next();
    } catch (error) {
        console.log("Middle Ware Error" , error)
        res.status(500).json({success : false  , error : "Server Error"})
    }
 }

 export default verifyUser;