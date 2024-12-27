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
        res.status(500).json({success : false , error : error.message ||"Adding Leave Error"})
      }
 }

 export const getLeave = async (req , res) =>{
  try {
    const {id} = req.params;
    const employee = await Employee.findOne({userId : id })

    const leaves = await Leave.find({employeeId : employee._id})
    return res.status(200).json({success : true ,leaves })

  } catch (error) {
    res.status(500).json({success : false , error : error.message ||"getting leave Error"})
  }
 }