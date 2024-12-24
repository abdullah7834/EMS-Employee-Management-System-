import React from 'react'
import {NavLink } from 'react-router-dom'
import {FaBuilding, FaCalendar, FaMoneyBillWave, FaTachometerAlt, FaToolbox, FaTools, FaUser} from 'react-icons/fa'

function Admin_Sidebar() {
  return (
    <div className='bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64'>
       <div className='bg-teal-600 h-12 flex items-center justify-center'>
        <h3 className='text-2xl text-center'>Employee MS</h3>
       </div>
       <div className='px-4'>
        <NavLink to='/admin-dashboard' className={({isActive})=>`${isActive ? 'bg-teal-600' : ''} flex items-center space-x-4  py-2.5 px-4 rounded `}
        end
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
        </NavLink>
        <NavLink to='/admin-dashboard' className='flex items-center space-x-4  py-2.5 px-4 rounded' >
            <FaUser />
            <span>Employees</span>
        </NavLink>
        <NavLink to='/admin-dashboard/departments' className={({isActive})=>`${isActive ? 'bg-teal-600' : ''} flex items-center space-x-4  py-2.5 px-4 rounded`} >
            <FaBuilding />
            <span>Departments</span>
        </NavLink>
        <NavLink to='/admin-dashboard' className='flex items-center space-x-4  py-2.5 px-4 rounded'>
            <FaCalendar />
            <span>Leaves</span>
        </NavLink>
        <NavLink to='/admin-dashboard'className='flex items-center space-x-4  py-2.5 px-4 rounded' >
            <FaMoneyBillWave />
            <span>Sallary</span>
        </NavLink>
        <NavLink to='/admin-dashboard'className='flex items-center space-x-4  py-2.5 px-4 rounded' >
            <FaTools />
            <span>Settings</span>
        </NavLink>
       </div>
    </div>
  )
}

export default Admin_Sidebar