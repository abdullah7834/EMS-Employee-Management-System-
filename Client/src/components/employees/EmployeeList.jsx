import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import axios from 'axios'
import { columns, EmployeeButtons } from '../../utils/EmployeesHelpers';
import DataTable from "react-data-table-component";

function EmployeeList() {
  const [employees , setemployees] = useState([])
  const [empLoading, setEmpLoading] = useState(false);
  const [filterEmp , setfilterEmp]= useState([])



  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const res = await axios.get("https://ems-employee-management-system-api.vercel.app/api/employee", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.data.success) {
          let sno = 1;
          const data = res.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department?.dep_name || "No Department",
            name  : emp.userId?.name || "Unknown",
            dob:new Date(emp.dob).toLocaleDateString(),
            profileImage :  emp.userId?.profileImage ?( <img width={40} className='rounded-full' src={`https://ems-employee-management-system-api.vercel.app/${emp.userId.profileImage}`}/>): (
              <span>No Image</span> // Handle missing profile image
            ),
            action: (
              
              <EmployeeButtons  _id = {emp._id}/>
            ),
          }));
          setemployees(data);
          setfilterEmp(data)
        } else {
          alert("Failed to fetch departments");
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error.message);
      if(error.response) {
        alert(error.response.data.error)
      }
      } finally {
        setEmpLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleFilter = (e) =>{
    const records  = employees.filter((emp) =>(
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    ))
    setfilterEmp(records)
  }
  return (
    <div className="p-5">
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold">Manage Employee</h3>
          </div>

          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search by Dep Name"
              className="px-4 py-0.5 border rounded"
              onChange={handleFilter}
            />
            <Link
              to="/admin-dashboard/add-employee"
              className="px-4 py-1 bg-teal-600 rounded text-white"
            >
              Add New Employee
            </Link>
          </div>
          <div className='mt-6'>
            <DataTable  columns={columns}  data = {filterEmp} pagination/>
          </div>
          </div>
  )
}

export default EmployeeList