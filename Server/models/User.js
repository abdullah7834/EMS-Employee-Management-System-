import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    name:{type : String , required : true},
    email:{type : String , required : true},
    password:{type : String , required : true},
    role:{type : String , required : true , enum:["admin" , "employee"]},
    profileImage:{type : String },
    profileImage:{type : String },
} ,{timestamps : true})

const User  = mongoose.model("User" , userSchema)
export default User;