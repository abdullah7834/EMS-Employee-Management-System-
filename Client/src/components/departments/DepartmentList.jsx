import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelpers";
import axios from "axios";

function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const [departmentLoading, setDepartmentLoading] = useState(false);
  const [filterDep , setfilterDEp]= useState([])

  // Handler for department deletion
  const ondepartmentDelete = () => {
      fetchDepartments();
  };
  const fetchDepartments = async () => {
    setDepartmentLoading(true);
    try {
      const res = await axios.get("https://ems-employee-management-system-backend.vercel.app/api/department", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        let sno = 1;
        const data = res.data.departments.map((dep) => ({
          _id: dep._id,
          sno: sno++,
          dep_name: dep.dep_name,
          action: (
            <DepartmentButtons
              _id={dep._id}
              ondepartmentDelete={ondepartmentDelete}
            />
          ),
        }));
        setDepartments(data);
        setfilterDEp(data)
      } else {
        alert("Failed to fetch departments");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      alert(
        error.response?.data?.error || "Something went wrong. Please try again."
      );
    } finally {
      setDepartmentLoading(false);
    }
  };
  // Fetch departments from the backend
  useEffect(() => {
    fetchDepartments();
  }, []);


  const filterDpartment = (e) =>{
   const records = departments.filter((dep)=>dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
   setfilterDEp(records)
  }
  return (
    <>
      {departmentLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div>Loading...</div>
        </div>
      ) : (
        <div className="p-5">
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold">Manage Departments</h3>
          </div>

          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search by Dep Name"
              className="px-4 py-0.5 border rounded"
              onChange={filterDpartment}
            />
            <Link
              to="/admin-dashboard/add-new-department"
              className="px-4 py-1 bg-teal-600 rounded text-white"
            >
              Add New Department
            </Link>
          </div>

          <div className="mt-5">
            <DataTable columns={columns} data={filterDep} keyField="_id" pagination />
          </div>
        </div>
      )}
    </>
  );
}

export default DepartmentList;
