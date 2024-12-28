import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import axios from "axios";

function Setting() {
    const navigate= useNavigate();
    const {user} = useAuth()
    const [setting , setsetting] = useState({
        userId : user._id,
        oldPassword:"",
        newPassword :"",
        confirmPassword :""
    })
    const [error , setError] = useState(null)
    const handleChange = (e) =>{
  const {name , value} = e.target;
  setsetting({...setting , [name] : value})
    }

    const handleSubmit =async (e) =>{
e.preventDefault();
if(setting.newPassword !== setting.confirmPassword){
    setError("Password not matched")
}else {
    try {
        const res =await axios.put("https://ems-employee-management-system-backend.vercel.app/api/setting/change-password" , setting , {headers :{
         Authorization: `Bearer ${localStorage.getItem("token")}`
        }
        })  
        if(res.data.success){
            navigate("/employee-dashboard")
            setError("")
        }
    } catch (error) {
        if(error.res &&  !error.res.data.success){
            setError(error.res.data.error)
        }
    }
}
    }
  return (
    <div className="maz-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <h2 className="text-2xl font-bold mb-6">Change Password</h2>
      <p className="text-red-500">{error}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="text-sm font-medium  text-gray-700">
            Old Password
          </label>
          <input
            type="password"
            placeholder="Enter Old Password"
            name="oldPassword"
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium  text-gray-700">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            placeholder="Enter new Password"
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium  text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confrm password"
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover;bg-teal-700 text-white font-bold py-2 px-4 rounded "
        >
          Change Password
        </button>
      </form>
    </div>
  );
}

export default Setting;
