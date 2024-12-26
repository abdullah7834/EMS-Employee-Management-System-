import axios from "axios";
import { useNavigate } from "react-router-dom";


export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    sortable : true,
    width: "70px"
  },
  {
    name: "Name",
    selector: (row) => row.name,
     width: "100px"
    
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
     width: "90px"
    
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
     width: "130px"

    
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
     width: "120px"
    
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center : true
  },
];










export const fetchDepartments = async () => {
    let departments 
    try {
      const res = await axios.get("http://localhost:3000/api/department", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
         departments = res.data.departments
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      alert(
        error.response?.data?.error || "Something went wrong. Please try again."
      );
    } 
    return departments
  };


  export const EmployeeButtons = ({ _id }) => {
    const navigate = useNavigate();
  
   
  
    return (
      <div className="flex space-x-3">
        <button
          className="px-3 py-1 bg-teal-700 text-white rounded"
          onClick={() => navigate(`/admin-dashboard/employees/${_id}`)}
        >
          View
        </button>
        <button
          className="px-3 py-1 bg-blue-600 text-white rounded"
          onClick={() => navigate(`/admin-dashboard/employees/edit/${_id}`)}
        >
          Edit
        </button>
        <button
          className="px-3 py-1 bg-yellow-600 te)xt-white rounded"
          
        >
          Sallary
        </button>
        <button
          className="px-3 py-1 bg-red-600 text-white rounded"
          
        >
          Leave
        </button>
      </div>
    );
  };
