import Employee from "../models/Employees.js";
import Leave from "../models/Leave.js";

 export const addLeave   = async (req , res ) =>{
    try {
        const  {userId , leaveType  , startDate  , endDate  , reason} = req.body ;
      
        const employee = await Employee.findOne({userId})

        if (!employee) {
            return res.status(404).json({ success: false, error: "Employee not found" });
        }
    
        const newleave  = await Leave({
          employeeId  : employee._id , leaveType  , startDate  , endDate  , reason
        })
        await newleave.save()
        return res.status(200).json({success : true , message : "added leave Succussfully"})
      } 
      catch (error) {
      return   res.status(500).json({success : false , error : error.message ||"Adding Leave Error"})
      }
 }

 export const getLeaveDetails  = async(req , res) =>{
  try {
    const {id} = req.params
    const leave = await Leave.findById({_id : id}).populate({
       path :"employeeId",
       populate:[   
        {
          path : 'department',
          select : 'dep_name'
        },
        {
          path : 'userId',
          select  : 'name  profileImage'
        }

       ]
    })
    console.log("leave Details" , leave)
    return res.status(200).json({success : true ,leave })
  } catch (error) {
  return  res.status(500).json({success : false , error : error.message ||"getting leaves Error"})
  }
 }

 export const getLeave = async (req , res) =>{
  try {
    const {id , role} = req.params;
    let leaves
    if(role === "admin"){
       leaves = await Leave.find({employeeId : id})
    }else {
      const employee = await Employee.findOne({userId : id })
      leaves = await Leave.find({employeeId : employee._id})
    }
    return res.status(200).json({success : true ,leaves })

  } catch (error) {
   return res.status(500).json({success : false , error : error.message ||"getting leave Error"})
  }
 }


 export const getLeaves = async(req , res) =>{
  try {
    const leaves = await Leave.find().populate({
       path :"employeeId",
       populate:[   
        {
          path : 'department',
          select : 'dep_name'
        },
        {
          path : 'userId',
          select  : 'name'
        }

       ]
    })
   
    return res.status(200).json({success : true ,leaves })
  } catch (error) {
   return  res.status(500).json({success : false , error : error.message ||"getting leaves Error"})
  }
 }
 

 export const updateLeave = async (req , res )=>{
  try {
    const {id} = req.params
    const leave = await Leave.findByIdAndUpdate({_id : id}, {status : req.body.status})
    if(!leave) {
    return   res.status(404).json({success : false , error : error.message ||" geting leaves Error"})
    }
    return res.status(200).json({success : true })
  } catch (error) {
   return  res.status(500).json({success : false , error : error.message ||"Updating leaves Error"})
  }
 }

