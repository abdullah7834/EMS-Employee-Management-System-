import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function LeaveDetails() {
    const { id } = useParams();
    const [leave, setLeave] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
   const navigate = useNavigate()
    useEffect(() => {
        const fetchLeave = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/leave/detail/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (res.data.success) {
                    setLeave(res.data.leave);
                }
            } catch (error) {
                setErrorMessage(error.response?.data?.error || "Unable to fetch employee details!");
            }
        };
        fetchLeave();
    }, []);
const changeStatus = async (id , status ) =>{
    try {
        const res = await axios.put(`http://localhost:3000/api/leave/${id}`,{status } , {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        if (res.data.success) {
            navigate('/admin-dashboard/leaves')
        }
    } catch (error) {
        setErrorMessage(error.response?.data?.error || "Unable to fetch employee details!");
    }
}
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
            {errorMessage ? (
                <div className="text-red-600 text-lg font-semibold">{errorMessage}</div>
            ) : leave ? (
                <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 p-5 flex justify-center items-center bg-gradient-to-br from-blue-500 to-purple-500">
                            <img
                                src={
                                    leave?.employeeId?.userId?.profileImage
                                        ? `http://localhost:3000/${leave.employeeId.userId.profileImage}`
                                        : "/default-profile.png"
                                }
                                alt="Profile"
                                className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-md"
                            />
                        </div>
                        <div className="md:w-2/3 p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center md:text-left">
                                Leave Details
                            </h2>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center border-b pb-3">
                                    <span className="font-semibold text-gray-600">Name:</span>
                                    <span className="text-gray-800">{
                                    leave.employeeId?.userId?.name || "N/A"}</span>
                                </div>
                                <div className="flex justify-between items-center border-b pb-3">
                                    <span className="font-semibold text-gray-600">Employee ID:</span>
                                    <span className="text-gray-800">{leave.employeeId?.employeeId || "N/A"}</span>
                                </div>
                                <div className="flex justify-between items-center border-b pb-3">
                                    <span className="font-semibold text-gray-600">Leave Type:</span>
                                    <span className="text-gray-800">{leave.leaveType || "N/A"}</span>
                                </div>
                                <div className="flex justify-between items-center border-b pb-3">
                                    <span className="font-semibold text-gray-600">Reason:</span>
                                    <span className="text-gray-800">{leave.reason || "N/A"}</span>
                                </div>
                                <div className="flex justify-between items-center border-b pb-3">
                                    <span className="font-semibold text-gray-600">Department:</span>
                                    <span className="text-gray-800">
                                        {leave.employeeId?.department?.dep_name || "N/A"}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-gray-600">Start Date:</span>
                                    <span className="text-gray-800">{new Date(leave.startDate).toLocaleDateString() || "N/A"}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-gray-600">End Date:</span>
                                    <span className="text-gray-800">{new Date(leave.endDate).toLocaleDateString() || "N/A"}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-gray-600">
                                        {leave.status === "Pending" ? "Action " : "Status"}
                                    </span>
                                    {leave.status === "Pending" ? (
                                        <div className='flex space-x-2'>
                                            <button className='bg-teal-600 text-white p-2 rounded' onClick={() =>changeStatus(leave._id , "Approved")}>Approve</button>
                                            <button className='bg-red-600 text-white p-2 rounded' onClick={() =>changeStatus(leave._id , "Rejected")}>Reject</button>
                                        </div>
                                    ):
                                    <span className="text-gray-800">{leave.status|| "N/A"}</span>
                                    }
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-lg text-gray-600">Loading...</div>
            )}
        </div>
    );
}

export default LeaveDetails;
