import mongoose from "mongoose";
import { Schema } from "mongoose";

const leaveSchema  =  new mongoose.Schema({
    employeeId : {type : Schema.Types.ObjectId  , ref :'Employee' ,  required : true  },
    leaveType :{type : String , enum :["Sick Leave" , "Annual Leave" , "Casual Leave"]  , required : true},
    startDate : {type : Date  , required : true },
    endDate : {type : Date , required : true },
    status : {type : String , enum  : ["Pending" , "Approved" , "Rejected"]  , default : "Pending"},
    reason :{type :String , required : true}
} , {timestamps : true})


const Leave  = mongoose.model("Leave" , leaveSchema)
export default Leave