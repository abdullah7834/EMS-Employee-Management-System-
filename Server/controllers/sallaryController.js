import Sallary from "../models/sallary.js";
import Employee from '../models/Employees.js'

export const addSallary = async(req , res) =>{
  try {
    const  {employeeId , basicSallary  , allowences  , deductions  , paydate} = req.body ;

    const totalSallary  = parseInt(basicSallary) + parseInt(allowences) - parseInt(deductions)

    const newsallary  = await Sallary({
        employeeId,
        basicSallary,
        allowences,
        deductions,
        netSallary : totalSallary,
        paydate
    })
    await newsallary.save()
    return res.status(200).json({success : true})
  } 
  catch (error) {
    res.status(500).json({success : false , error : error.message || "Sallary add Server Error"})
  }
}


export const getSallary = async (req , res ) =>{
    try {
        const {id} = req.params
      let sallary  = await Sallary.find({employeeId  :  id}).populate('employeeId' , 'employeeId')
      if(!sallary || sallary.length < 1 ){
        const employee = await Employee.findOne({userId : id})
        sallary = await Sallary.find({employeeId : employee._id}).populate('employeeId' , 'employeeId')
      }
      return res.status(200).json({success  : true , sallary})
    } catch (error) {
        res.status(500).json({success : false , error : error.message || "Sallary get Server Error"})
    }
}