import { time } from "console";
import mongoose, { Schema } from "mongoose";



const employeeSchema = new mongoose.Schema({
   userId :{type : Schema.Types.ObjectId  , ref :'User' ,  required : true  },
   employeeId : {type : String  , required : true , unique : true },
   dob : {type : Date },
   gender : {type : String  , required : true },
   maritalStatus : {type : String  , required : true },
   designation : {type : String  , required : true },
   department :{type  : Schema.Types.ObjectId  , ref :'Department' ,  required : true  },
   sallary :{type : Number  , required : true}
} , {timestamps : true})


const Employee  = mongoose.model("Employee" , employeeSchema)   
export default Employee