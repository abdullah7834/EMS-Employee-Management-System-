// import Department from "../models/Department.js"


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

// export const getEmployee =async (req , res) =>{
//    try {
//     const departments  = await Department.find()
//     return res.status(200).json({success : true  , departments})
//    } catch (error) {
//     return res.status(500).json({success : false  , error : "Department not found"})
//    }
// }




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
        const savedEmployee = await newEmployee.save();

        // Update the user's employees array
        savedUser.employees.push(savedEmployee._id);
        await savedUser.save();

        return res.status(200).json({ success: true, message: "Employee created successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Employee add failed due to some reason" });
    }
};

  

//   export const viewDepartment = async(req , res) =>{
//     try {
//         const {id} = req.params;
//     const department  =  await Department.findById({_id : id})
//     return res.status(200).json({success : true  , department})
//     } catch (error) {
//         res.status(500).json({success : false  , error : "Department not found"}) 
//     }
//   }


//   export const updateDepartment = async (req , res ) =>{
//     try {
//       const{id} = req.params
//       const {dep_name , description} = req.body;
//       const updateDEp = await Department.findByIdAndUpdate({_id : id} , {dep_name , description} , {new : true})
//       return res.status(200).json({success : true , updateDEp})
//     } catch (error) {
//       return res.status(500).json({success : false  , error : "Department edit Failed due to some Reason "})
//     }
//   }


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