import User from "../models/User.js";
import bcrypt from 'bcrypt'

export const  changePassword = async(req, res) =>{
    try {
        const{userId , oldPassword  , newPassword} = req.body;
        const user = await User.findById({_id : userId})
   if(!user){
    return res.status(404).json({success: false , message :"user not found"})
}
    const isMatch = await bcrypt.compare(oldPassword , user.password)

    if(!isMatch){
        return res.status(404).json({success: false , message :"Incorrect Password"})
    }
  const hashPasword = await bcrypt.hash(newPassword , 10)
   const newUser = await User.findByIdAndUpdate({_id : userId},{password : hashPasword}) 
   return res.status(200).json({success : true , newUser})
   
    } catch (error) {
        return res.status(404).json({success: false , message :"Cannot change Password"})
    }
}