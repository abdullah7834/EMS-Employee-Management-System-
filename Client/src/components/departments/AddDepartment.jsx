import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddDepartment() {
  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://ems-employee-management-system-r42scz8oj.vercel.app/api/department/add",
        department,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (res.data.success) {
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      if (error.res && !error.res.data.success) {
        alert(error.res.data.error);
      }
    }
  };
  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <div className="text-2xl font-bold mb-6">
        <h3>Add Department</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="dep_name"
            className="text-sm font-medium text-gray-700"
          >
            Department Name
          </label>
          <input
            type="text"
            name="dep_name"
            placeholder="Enter Dep name"
            className="mt-1 w-full border border-gray-300 rounded-md p-2"
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 "
          >
            Description
          </label>
          <textarea
            type="description"
            name="description"
            placeholder="Descritption"
            rows="4"
            className="mt-1 p-2  w-full border border-gray-300 rounded-md block"
            onChange={handleChange}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 font-bold rounded"
        >
          Add Department
        </button>
      </form>
    </div>
  );
}

export default AddDepartment;
