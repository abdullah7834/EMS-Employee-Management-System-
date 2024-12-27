import Department from "../models/Department.js"


import multer from "multer";
import Employee from "../models/Employees.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import path from "path";



const storage = multer.diskStorage({
    destination : (req, file  , cb )=>{
        cb(null , "public/uploads")
    },
    filename :  (req , file  , cb)=>{
        cb(null  , Date.now() + path.extname(file.originalname))    
    }

})  

export  const upload = multer({storage : storage}) 

export const getEmployees =async (req , res) =>{
   try {
    const employees  = await Employee.find().populate('userId' , {password : 0}).populate('department')
    return res.status(200).json({success : true  , employees})
   } catch (error) {
    return res.status(500).json({success : false  , error : "employees  not found"})
   }
}
export const viewEmployee = async(req , res) =>{
    try {
        let employee
        const {id} = req.params;
    employee  =  await Employee.findById({_id :id}).populate('userId' ,{password : 0}).populate('department')
    if (!employee) {
     employee =    await Employee.findOne({userId :  id}).populate('userId' , {password : 0}).populate('department')
      }
  
    return res.status(200).json({success : true  , employee})
    } catch (error) {
        res.status(500).json({success : false  , error : "Employee not found"}) 
    }
  }



export const addEmployee = async (req, res) => {
    try {
        const { name, email, employeeId, dob, gender, maritalStatus, designation, department, sallary, password, role } = req.body;

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, error: "User already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            profileImage: req.file ? req.file.filename : "",
        });
        const savedUser = await newUser.save();

        const newEmployee = new Employee({
            userId: savedUser._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            sallary,
        });
         await newEmployee.save();
        return res.status(200).json({ success: true, message: "Employee created successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Employee add failed due to some reason" });
    }
};

  




  export const UpdateEmployee = async (req , res ) =>{
    try {
      
        const{id} = req.params
        const {name  ,  maritalStatus  , designation  , department  , sallary} = req.body;
       const employee  = await Employee.findById(id)
       if(!employee){
          return res.status(404).json({success : false  , error : "Employee not found"})
      }
      const user  = await User.findById({_id : employee.userId})
  
      if(!user) {
          return res.status(404).json({success : false  , error : "User not found"})
      }
      const updateUser  = await User.findByIdAndUpdate({_id : employee.userId} , {name} , {new : true})
  
  
        const updateEmployee = await Employee.findByIdAndUpdate({_id : id} , {  maritalStatus  , designation  ,  sallary , department} , {new : true})
  
        if(!updateEmployee || !updateUser){
          return res.status(404).json({success : false  , error : "document  not found"})
      } 
      else  {
          return res.status(200).json({success : true  , message : 'employee Updated'})
      } 
  }catch(error) {
      return res.status(500).json({success : false  , error : error.message ||'Update employee server Error'})
  }
  }


  export const fetchEmployeesByDepId = async (req, res) => {
    try {
        const {id} = req.params;
    const employees  =  await Employee.find({department : id })
    if (!employees) {
        // If employee is not found
        return res.status(404).json({ success: false, error: 'Employee not found' });
      }
  
    return res.status(200).json({success : true  , employees})
    } catch (error) {
        res.status(500).json({success : false  , error : "EmployeeByDEpID not found"}) 
    }
  }

//   export const deleteDepartment = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const deleteDep = await Department.findByIdAndDelete(id); // Directly pass id
  
//       if (!deleteDep) {
//         return res.status(404).json({ success: false, error: "Department not found" });
//       }
  
//       return res.status(200).json({ success: true, deleteDep });
//     } catch (error) {
//       return res.status(500).json({ success: false, error: "Department delete failed due to some reason" });
//     }
//   };