import React from 'react'
import { useAuth } from '../context/authContext'
import Admin_Sidebar from '../components/dashBoard/Admin_Sidebar'
import Nav from '../components/dashBoard/Nav'




function AdminDashboard() {
  const {user  , loading} = useAuth()

  return (
     <div className = 'flex'>
    <Admin_Sidebar />
    <div className='flex-1ml-64 bg-gray-100 h-screen'>
     <Nav />
    </div>
     </div>
  )
}

export default AdminDashboard  