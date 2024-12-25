import React from 'react'
import { Link } from 'react-router-dom'


function EmployeeList() {
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
              
            />
            <Link
              to="/admin-dashboard/add-employee"
              className="px-4 py-1 bg-teal-600 rounded text-white"
            >
              Add New Employee
            </Link>
          </div>
          </div>
  )
}

export default EmployeeList