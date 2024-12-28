import Department from "../models/Department.js"


export const getDepartments =async (req , res) =>{
   try {
    const departments  = await Department.find()
    return res.status(200).json({success : true  , departments})
   } catch (error) {
    return res.status(500).json({success : false  , error : "Department not found"})
   }
}




export const addDepartment = async (req, res) => {
    try {
      const { dep_name, description } = req.body;
      console.log("Received data:", req.body); // Log incoming data
  
      if (!dep_name || !description) {
        return res.status(400).json({ success: false, error: "All fields are required." });
      }
  
      const newDepartment = new Department({
        dep_name,
        description,
      });
  
      await newDepartment.save();
      console.log("Department added successfully"); // Log success
      return res.status(201).json({ success: true, message: "Department added successfully." });
    } catch (error) {
      console.error("Error adding department:", error); // Log error
      return res.status(500).json({ success: false, error: "Add department server error." });
    }
  };
  

  export const viewDepartment = async(req , res) =>{
    try {
        const {id} = req.params;
    const department  =  await Department.findById({_id : id})
    return res.status(200).json({success : true  , department})
    } catch (error) {
    return  res.status(500).json({success : false  , error : "Department not found"}) 
    }
  }


  export const updateDepartment = async (req , res ) =>{
    try {
      const{id} = req.params
      const {dep_name , description} = req.body;
      const updateDEp = await Department.findByIdAndUpdate({_id : id} , {dep_name , description} , {new : true})
      return res.status(200).json({success : true , updateDEp})
    } catch (error) {
      return res.status(500).json({success : false  , error : "Department edit Failed due to some Reason "})
    }
  }


  export const deleteDepartment = async (req, res) => {
    try {
      const { id } = req.params;
      const deleteDep = await Department.findById(id); // Directly pass id
      await Department.deleteOne()
  
      if (!deleteDep) {
        return res.status(404).json({ success: false, error: "Department not found" });
      }
  
      return res.status(200).json({ success: true, deleteDep });
    } catch (error) {
      return res.status(500).json({ success: false, error: "Department delete failed due to some reason" });
    }
  };