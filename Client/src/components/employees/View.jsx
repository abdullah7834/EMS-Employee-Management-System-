import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect , useState } from 'react'
import axios from 'axios'

function View() {
    const {id} = useParams()
    const [employee , setEmployee] = useState(null)
    useEffect(() => {
        const fetchEmployee = async () => {
            
            try {
                const res = await axios.get(`http://localhost:3000/api/employee/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                console.log(res.data)
                if (res.data.success) {
                    setEmployee(res.data.employee);
                }
            } catch (error) {
                console.log(error)
                if (error.res &&  !error.res.data.success) {
                    alert(error.res.data.error);
                } 
            } 
        };
        fetchEmployee();
    }, []);
   
  return (
    <>{employee ? (
    <div className='max-w-3xl mx-auto  mt-10 bg-white p-8 rounded-md shadow-md'>
  <h2 className='text-2xl font-bold mb-8 text-center'>Employee Details</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
            <img src={`http://localhost:3000/${employee.userId?.profileImage}`} alt="Profile"  className='rounded-full border w-72' />
            </div>
        <div className='flex space-x-3 mb-5'>
            <p className='text-lg font-bold'>Name :</p>
            <p className='font-medium'>{employee.userId.name || "N/A"}</p>
        </div>
        <div className='flex space-x-3 mb-5'>
            <p className='text-lg font-bold'>Employee ID:</p>
            <p className='font-medium'>{employee.employeeId || "N/A" }</p>
        </div>
        <div className='flex space-x-3 mb-5'>
            <p className='text-lg font-bold'>Date of Birth:</p>
            <p className='font-medium'>{employee.dob || "N/A"}</p>
        </div>
        <div className='flex space-x-3 mb-5'>
            <p className='text-lg font-bold'>Gender:</p>
            <p className='font-medium'>{employee.gender || "N/A" }</p>
        </div>
        <div className='flex space-x-3 mb-5'>
            <p className='text-lg font-bold'>Department:</p>
            <p className='font-medium'>{employee.department.dep_name || "N/A"}</p>
        </div>
        <div className='flex space-x-3 mb-5'>
            <p className='text-lg font-bold'>Marital Status :</p>
            <p className='font-medium'>{employee.maritalStatus || "N/A"}</p>
        </div>
        </div>
    </div>
    ) :<div>Loading ...</div>}</>
  )
  
}

export default View