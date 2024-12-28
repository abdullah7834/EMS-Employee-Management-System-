import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/authContext';
 

function List() {
  
  const [leaves, setLeaves] = useState(null);
  let sno = 1;
   const {id} = useParams()
   const {user} = useAuth()

  const fetchLeaves = async () => {
    try { 
      const res = await axios.get(
        `https://ems-employee-management-system-backend.vercel.app/api/leave/${id}/${user.role}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      if (res.data.success) {
        setLeaves(res.data.leaves);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        console.log(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

   if(!leaves) {
    return <div>Loading....</div>
    
   }
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="text-center mb-6">
        <h3 className="text-3xl font-semibold text-gray-800">Manage Leave</h3>
      </div>

      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search by Department Name"
          className="w-1/3 px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-teal-300 focus:outline-none"
        />
        {user.role === 'employee' &&(
        <Link
          to="/employee-dashboard/add-leave"
          className="px-5 py-2 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700 transition"
        >
          Add New Leave
        </Link> 
      )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600 bg-white shadow-lg rounded-lg">
          <thead className="text-xs uppercase bg-teal-600 text-white">
            <tr>
              <th className="px-6 py-3">S.No</th>
              <th className="px-6 py-3">Leave Type</th>
              <th className="px-6 py-3">From</th>
              <th className="px-6 py-3">To</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr
                key={leave._id}
                className="hover:bg-gray-100 border-b transition-colors"
              >
                <td className="px-6 py-4 text-gray-800">{sno++}</td>
                <td className="px-6 py-4 text-gray-800">{leave.leaveType}</td>
                <td className="px-6 py-4 text-gray-800">
                  {new Date(leave.startDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-gray-800">
                  {new Date(leave.endDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-gray-600">{leave.reason}</td>
                <td
                  className={`px-6 py-4 font-semibold ${
                    leave.status === "Approved"
                      ? "text-green-600"
                      : leave.status === "Rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {leave.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default List;
