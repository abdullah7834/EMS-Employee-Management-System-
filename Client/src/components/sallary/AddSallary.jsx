import React, { useEffect, useState } from "react";
import { fetchDepartments, getEmployees } from "../../utils/EmployeesHelpers";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddSallary() {
  const [sallary, setSallary] = useState({
    employeeId: "",
    basicSallary: "",
    allowences: "",
     deductions:"",
     paydate :null
  });
  const [departments, setdepartments] = useState(null);
  const [employees  , setEmployees ] = useState([])
  const navigate = useNavigate();


  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setdepartments(departments);
    };
    getDepartments();
  }, []);

  const handleDepartment = async (e) => {
    try {
        const emps = await getEmployees(e.target.value); // Ensure getEmployees is defined and works correctly
        setEmployees(emps); // Ensure setEmployees is defined and updates the state properly
    } catch (error) {
        console.error("An error occurred while fetching employees:", error.message);
    }
};



  const handleChange = (e) => {
    const { name, value } = e.target;
    setSallary((prevData) => ({ ...prevData, [name]: value }));
  };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        const res = await axios.post(
            'https://ems-employee-management-system-backend.vercel.app/api/sallary/add',
            sallary,
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
    };
  return (
    <>
      {departments ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-6">Add Salary</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <select
                name="department"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
                onChange={handleDepartment}
              >
                <option value="">Select Department</option>
                {departments?.map((department) => (
                  <option key={department._id} value={department._id}>
                    {department.dep_name}
                  </option>
                ))}
              </select>
            </div>
      
            {/* Employee */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Employee
              </label>
              <select
                name="employeeId"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
                onChange={handleChange}
              >
                <option value="">Select Employee</option>
                {employees?.length > 0 &&  employees.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.employeeId}
                  </option>
                ))}
              </select>
            </div>
      
            {/* Basic Salary */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Basic Salary
              </label>
              <input
                type="number"
                name="basicSallary"
                placeholder="Basic Salary"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
                onChange={handleChange}
              />
            </div>
      
            {/* Allowance */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Allowance
              </label>
              <input
                type="number"
                name="allowences"
                placeholder="Allowances"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
                onChange={handleChange}
              />
            </div>
      
            {/* Deductions */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Deductions
              </label>
              <input
                type="number"
                name="deductions"
                placeholder="Deductions"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
                onChange={handleChange}
              />
            </div>
      
            {/* Pay Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pay Date
              </label>
              <input
                type="date"
                name="paydate"
                placeholder="Pay Date"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
                onChange={handleChange}
              />
            </div>
          </div>
      
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold px-4 py-2 rounded"
          >
            Add Sallary
          </button>
        </form>
      </div>
      
      ) : (
        <div className="text-center mt-10 text-green-800 font-bold ">Loading .... </div>
      )}
    </>
  );
}

export default AddSallary;
