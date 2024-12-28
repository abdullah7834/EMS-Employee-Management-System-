import mongoose from "mongoose";
import Employee from "./Employees.js";
import Leave from "./Leave.js";
import Sallary from "./sallary.js";
import User from "./User.js";


const departmentSchema = new mongoose.Schema({
    dep_name :{type : String  , required : true },
    description:{type : String  , required : true },
},{timestamps : true })


departmentSchema.pre("deleteOne" , {document : true   , query : false} , async function(next){
    try {
        const employees = await Employee.find({department :this._id})
        const empIds = employees.map(emp => emp._id)
        await Employee.deleteMany({department : this._id})
        await Leave.deleteMany({employeeId : {$in : empIds}})
        await Sallary.deleteMany({employeeId : {$in : empIds}})
        await User.deleteMany({ _id: { $in: employees.map(emp => emp.userId) } });

        next() 
    } catch (error) {
        next(error)
    }
})


const Department  = mongoose.model("Department" , departmentSchema)

export default Department ;