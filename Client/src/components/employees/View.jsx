import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function View() {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const res = await axios.get(`https://ems-employee-management-system-r42scz8oj.vercel.app/api/employee/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (res.data.success) {
                    setEmployee(res.data.employee);
                }
            } catch (error) {
                setErrorMessage(error.response?.data?.error || "Unable to fetch employee details!");
            }
        };
        fetchEmployee();
    }, [id]);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
            {errorMessage ? (
                <div className="text-red-600 text-lg font-semibold">{errorMessage}</div>
            ) : employee ? (
                <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 p-5 flex justify-center items-center bg-gradient-to-br from-blue-500 to-purple-500">
                            <img
                                src={
                                    employee?.userId?.profileImage
                                        ? `https://ems-employee-management-system-r42scz8oj.vercel.app/${employee.userId.profileImage}`
                                        : "/default-profile.png"
                                }
                                alt="Profile"
                                className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-md"
                            />
                        </div>
                        <div className="md:w-2/3 p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center md:text-left">
                                Employee Details
                            </h2>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center border-b pb-3">
                                    <span className="font-semibold text-gray-600">Name:</span>
                                    <span className="text-gray-800">{employee?.userId?.name || "N/A"}</span>
                                </div>
                                <div className="flex justify-between items-center border-b pb-3">
                                    <span className="font-semibold text-gray-600">Employee ID:</span>
                                    <span className="text-gray-800">{employee?.employeeId || "N/A"}</span>
                                </div>
                                <div className="flex justify-between items-center border-b pb-3">
                                    <span className="font-semibold text-gray-600">Date of Birth:</span>
                                    <span className="text-gray-800">{new Date(employee?.dob).toLocaleDateString() || "N/A"}</span>
                                </div>
                                <div className="flex justify-between items-center border-b pb-3">
                                    <span className="font-semibold text-gray-600">Gender:</span>
                                    <span className="text-gray-800">{employee?.gender || "N/A"}</span>
                                </div>
                                <div className="flex justify-between items-center border-b pb-3">
                                    <span className="font-semibold text-gray-600">Department:</span>
                                    <span className="text-gray-800">
                                        {employee?.department?.dep_name || "N/A"}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-gray-600">Marital Status:</span>
                                    <span className="text-gray-800">{employee?.maritalStatus || "N/A"}</span>
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

export default View;
