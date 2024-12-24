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
  