import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";


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
      const res = await axios.get("https://ems-employee-management-system-backend.vercel.app/api/department", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
         departments = res.data.departments
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error.message);
    } 
    return departments
  };


  export const getEmployees  = async (id) => {
    let employees 
    try {
      const res = await axios.get(`https://ems-employee-management-system-backend.vercel.app/api/employee/department/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
      if (res.data.success) {
         employees = res.data.employees
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error.message);
    } 
    return employees
  }

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
          onClick={() => navigate(`/admin-dashboard/employees/sallary/${_id}`)}
        >
          Sallary
        </button>
        <button
          className="px-3 py-1 bg-red-600 text-white rounded"
          onClick={()=> navigate(`/admin-dashboard/employees/leaves/${_id}`)}
        >
          Leave
        </button>
      </div>
    );
  };
