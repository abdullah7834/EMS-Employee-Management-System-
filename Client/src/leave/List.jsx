import React, { useState , useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {useAuth} from '../context/authContext'

function List() {
  const {user} = useAuth()
  const [leaves  , setLeaves] = useState([])
  let sno = 1;
  const fetchLeaves  = async () =>{
    try {
        const res  = await axios.get(`http://localhost:3000/api/leave/${user._id}` , {headers : {'Authorization' : `Bearer ${localStorage.getItem("token")}`}})
        if(res.data.success){
            setLeaves(res.data.leaves)
            
        }
    
    } catch (error) {
        if(error.res && !error.res.data.success){
            console.log(error.message)
    }
}
}
useEffect(()=>{
fetchLeaves()
} ,[])
  return (
    <div className="p-5">
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold">Manage Leave</h3>
          </div>

          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search by Dep Name"
              className="px-4 py-0.5 border rounded"
             
            />
            <Link
              to="/employee-dashboard/add-leave"
              className="px-4 py-1 bg-teal-600 rounded text-white"
            >
              Add New Leave
            </Link>
          </div>
          <table className='w-full text-sm text-left text-gray-500'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200'>
     <tr>
        <th className='px-6 py-3'>SNO</th>
        <th className='px-6 py-3'>Leave Type</th>
        <th className='px-6 py-3'>From</th>
        <th className='px-6 py-3'>To</th>
        <th className='px-6 py-3'>Description</th>
        <th className='px-6 py-3'>Status</th>
     </tr>
                </thead>
                <tbody>
                    {leaves.map((leave) =>(
                        <tr key={leave._id} className='bg-white border-b dark:bg-gray-700'>
                            <td className='px-6 py-3'>{sno++}</td>
                            <td className='px-6 py-3'>{leave.leaveType}</td>
                            <td className='px-6 py-3'>{new Date(leave.startDate).toLocaleDateString()}</td>
                            <td className='px-6 py-3'>{new Date(leave.endDate).toLocaleDateString()}</td>
                            <td className='px-6 py-3'>{leave.reason}</td>
                            <td className='px-6 py-3'>{leave.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
  )
}

export default List