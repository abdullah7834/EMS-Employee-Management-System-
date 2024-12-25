import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
function EditComponent() {
    const {id} = useParams()
const[department , setDepartment] = useState({})
const[departmentLoading  , setdepartmentLoading] = useState(false)
const navigate = useNavigate()
    useEffect(() => {
        const fetchDeoartments = async () => {
            setdepartmentLoading(true);
            try {
                const res = await axios.get(`http://localhost:3000/api/department/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (res.data.success) {
                    setDepartment(res.data.department);
                }
            } catch (error) {
                if (error.res &&  !error.res.data.success) {
                    alert(error.res.data.error);
                } 
            } finally {
                setdepartmentLoading(false);
            }
        };
        fetchDeoartments();
    }, [id]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:3000/api/department/${id}`,
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
      }
  return (
    <>{departmentLoading ? <p>Loading...</p> :
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <div className="text-2xl font-bold mb-6">
        <h3>Edit Department</h3>
      </div>
      <form onSubmit={handleSubmit} >
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
            value={department.dep_name}
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
            value={department.description} 
            onChange={handleChange}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 font-bold rounded"
        >
          Edit Department
        </button>
      </form>
    </div>
    }</>
  )
}

export default EditComponent