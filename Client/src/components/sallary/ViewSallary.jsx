import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../context/authContext'

function ViewSallary() {
    const[sallaries , setSallareis] = useState(null)
    const [filteredSallaries , setFilteredSallaries] = useState(null)
    const {id} = useParams ()
    let sno = 1 ;
    const {user} = useAuth()
    const fetchSallaries  = async () =>{
        try {
            const res  = await axios.get(`https://ems-employee-management-system-r42scz8oj.vercel.app/api/sallary/${id}/${user.role}` , {headers : {'Authorization' : `Bearer ${localStorage.getItem("token")}`}})
            if(res.data.success){
                setSallareis(res.data.sallary)
                setFilteredSallaries(res.data.sallary)
            }
        
        } catch (error) {
            if(error.res && !error.res.data.success){
                console.log(error.message)
        }
    }
    }
    useEffect(()=>{
  fetchSallaries()
    } ,[])
const filterSallaries   = (q) =>{
   const filteredRecords  = sallaries.filter((leave) => 
    leave.emnployeeId.toLowerCase().includes(q.toLowerCase())
)
   setFilteredSallaries(filteredRecords)
}


  return (
    <>{filteredSallaries === null ? (
        <div>Loading ....</div>
    ) :(
        <div className='overflow-x-auto p-5'>
            <div className='text-center'>
                <h2 className='text-2xl font-bold'>Sallary History</h2>
            </div>
        <div className='flex justify-end my-3'>
    <input type="text"
    placeholder='Search by Employee ID'
    className='border px-2 rounded-md py-0.5 border-gray-300'
    onChange={filterSallaries}
     />
        </div>
        {filteredSallaries.length > 0 ? (
            <table className='w-full text-sm text-left text-gray-500'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200'>
     <tr>
        <th className='px-6 py-3'>SNO</th>
        <th className='px-6 py-3'>Emp ID</th>
        <th className='px-6 py-3'>Sallary</th>
        <th className='px-6 py-3'>Allowence</th>
        <th className='px-6 py-3'>Deduction</th>
        <th className='px-6 py-3'>Total</th>
        <th className='px-6 py-3'>Pay Date</th>
     </tr>
                </thead>
                <tbody>
                    {filteredSallaries.map((sallary) =>(
                        <tr key={sallary.id} className='bg-white border-b dark:bg-gray-700'>
                            <td className='px-6 py-3'>{sno++}</td>
                            <td className='px-6 py-3'>{sallary.employeeId.employeeId}</td>
                            <td className='px-6 py-3'>{sallary.basicSallary}</td>
                            <td className='px-6 py-3'>{sallary.allowences}</td>
                            <td className='px-6 py-3'>{sallary.deductions}</td>
                            <td className='px-6 py-3'>{sallary.netSallary }</td>
                            <td className='px-6 py-3'>{new Date(sallary.paydate).toLocaleDateString() }</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ): <div> No Records</div> }
        </div>
    )}</>
   
  )
}

export default ViewSallary