import React from 'react'
import { useAuth } from '../context/authContext'
import Admin_Sidebar from '../components/dashBoard/Admin_Sidebar'
import Nav from '../components/dashBoard/Nav'
import AdminSummary from '../components/dashBoard/AdminSummary'
import { Outlet } from 'react-router-dom'




function AdminDashboard() {
  const {user  , loading} = useAuth()

  return (
     <div className = 'flex'>
    <Admin_Sidebar />
    <div className='flex-1 ml-64 bg-gray-100 h-screen'>
     <Nav />
     <Outlet />
    </div>
     </div>
  )
}

export default AdminDashboard  