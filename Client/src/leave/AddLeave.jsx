import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';





function AddLeave() {
    const {user} = useAuth()
    const navigate  = useNavigate()
    const [leave , setleave] = useState({
     userId : user._id,

    }) 




    const handleChange = (e) =>{
        const {name  , value} = e.target ;
        setleave((prevState) => ({...prevState , [name]: value}))
        }

    const handleSubmit  = async (e) =>{
     e.preventDefault()
     try {
        const res = await axios.post('https://ems-employee-management-system-r42scz8oj.vercel.app/api/leave/add',leave , {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        if (res.data.success) {
             navigate(`/employee-dashboard/leaves/${user._id}`)
        }
    } catch (error) {
        if(error.res && !error.res.data.success){
            console.log(error.res.data.error)
        }
    }

    }
  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Request for Leave</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Leave Type</label>
            <select
              name="leaveType"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              onChange={handleChange}
              required
            >
              <option value="">Select Leave Type</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Annual Leave">Annual Leave</option>
              <option value="Casual Leave">Casual Leave</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700" >From Date</label>
              <input
                type="date"
                name="startDate"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">To Date</label>
              <input
                type="date"
                name="endDate"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="reason"
              placeholder="Reason"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
              rows="4"
              required
              onChange={handleChange}
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Leave
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddLeave;
