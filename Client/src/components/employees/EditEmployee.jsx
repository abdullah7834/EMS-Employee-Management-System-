import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeesHelpers";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditEmployee() {
  const [employee , setEmployee] = useState({
    name :'',
    maritalStatus :'',
    designation :'', 
    sallary :'',
    department :''
  })
  const [departments , setdepartments] = useState(null)
//   const [formData, setFormData] = useState({});
  const navigate = useNavigate()
  const {id} = useParams()


useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setdepartments(departments);
    };
    getDepartments();
  }, []);




  useEffect(() => {
    const fetchEmployee = async () => {
            
        try {
            const res = await axios.get(`https://ems-employee-management-system-r42scz8oj.vercel.app/api/employee/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            console.log(res.data)
            if (res.data.success) {
                const employee = res.data.employee
                setEmployee((prev) => ({...prev , name : employee.userId?.name , maritalStatus : employee.maritalStatus , designation : employee.designation , sallary : employee.sallary , department : employee.department}));
            }
        } catch (error) {
            console.log(error)
            if (error.res &&  !error.res.data.success) {
                alert(error.res.data.error);
            } 
        } 
    };
    fetchEmployee();
}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
      setEmployee((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit  = async (e) =>{
    e.preventDefault();
    
    try {
        const res = await axios.put(
        `https://ems-employee-management-system-r42scz8oj.vercel.app/api/employee/${id}`,
        employee ,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        if (res.data.success) {
          navigate("/admin-dashboard/employees");
        }
      } catch (error) {
        if (error.res && !error.res.data.success) {
          alert(error.res.data.error);
        }
      }
  }
  return (
    <>{departments && employee  ? (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md ">
      <h2 className="text-2xl font-bold mb-6 ">Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Insert Name"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
              value={employee.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Marital Status
            </label>
            <select
              name="maritalStatus"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
              value={employee.maritalStatus}
              onChange={handleChange}
            >
              <option value=""> Select Marital Status</option>
              <option value="single">Single</option>
              <option value="Married">Married</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Designation
            </label>
            <input
              type="text"
              name="designation"
              placeholder="Designation"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
              value={employee.designation}
              onChange={handleChange}
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sallary
            </label>
            <input
              type="number"
              name="sallary"
              placeholder="Sallary"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
              value={employee.sallary}
              onChange={handleChange}
            />
          </div>
          {/* Department */}
          <div className="col-span-2 ">
            <label className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <select
              name="department"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
              value={employee.department}
              onChange={handleChange}
            >
              <option value=""> Select Department</option>
              {departments.map((department) => (
                <option key={department._id} value={department._id}>
                  {department.dep_name}
                </option>
              ))}
            </select>
          </div>
          
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold px-4 py-2 rounded "
        >
          Update Employee
        </button>
      </form>
    </div>
    ):<div>Loading .... </div>}</>
  );
}

export default EditEmployee;
