import mongoose , { Schema } from "mongoose";



const sallarySchema =  new mongoose.Schema({
      employeeId : {type : Schema.Types.ObjectId  , ref :'Employee' ,  required : true  },
      basicSallary :{type : Number  , required : true},
      allowences : {type : Number },
      deductions : {type : Number },
      netSallary : {type : Number },
      paydate : {type : Date , required :  true}
} ,{timestamps : true}) 


const Sallary  = mongoose.model("Sallary" , sallarySchema)
export default Sallary