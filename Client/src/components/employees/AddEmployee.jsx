import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeesHelpers";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddEmployee() {
  const [departments, setdepartments] = useState([]);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate()
  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setdepartments(departments);
    };
    getDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit  = async (e) =>{
    e.preventDefault();
    const formDataobj  =  new FormData()
    Object.keys(formData).forEach((key)=>{
        formDataobj.append(key,formData[key])
    })
    try {
        const res = await axios.post(
          "https://ems-employee-management-system-api.vercel.app/api/employee/add",
          formDataobj,
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
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md ">
      <h2 className="text-2xl font-bold mb-6 ">Add New Employee</h2>
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
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Insert Email"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Employee ID
            </label>
            <input
              type="text"
              name="employeeId"
              placeholder="Employee ID"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date Of Birth
            </label>
            <input
              type="date"
              name="dob"
              placeholder="Date Of Birth"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              name="gender"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
              onChange={handleChange}
            >
              <option value=""> Select Gender</option>
              <option value="male">Male</option>
              <option value="female">FeMale</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Marital Status
            </label>
            <select
              name="maritalStatus"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
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
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <select
              name="department"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
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
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="********"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              name="role"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
              onChange={handleChange}
            >
              <option value=""> Select Role</option>
              <option value="admin">Admin</option>
              <option value="employee"> Employee</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              placeholder="Upload Image"
              accept="image/*"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
              onChange={handleChange}
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold px-4 py-2 rounded "
        >
          Add Employee
        </button>
      </form>
    </div>
  );
}

export default AddEmployee;
