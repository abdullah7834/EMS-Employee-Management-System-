import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelpers";
import axios from "axios";

function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const [departmentLoading  , setdepartmentLoading] = useState(false)
  useEffect(() => {
    const fetchDeoartments = async () => {
        setdepartmentLoading(true);
        try {
            const res = await axios.get("http://localhost:3000/api/department", {
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
                    action: <DepartmentButtons  _id = {dep._id}/>,
                }));
                setDepartments(data);
            }
        } catch (error) {
            if (error.res && error.res.data && !error.res.data.success) {
                alert(error.res.data.error);
            } else {
                console.error("An unexpected error occurred:", error);
                
            }
        } finally {
            setdepartmentLoading(false);
        }
    };
    fetchDeoartments();
}, []);

  return (
    <>{departmentLoading ? <div>Loading...</div> :
    <div className="p-5">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Departments</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by Dep Name"
          className="px-4 py-0.5 border"
        />
        <Link
          to="/admin-dashboard/add-new-department"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add New Department
        </Link>
      </div>
      <div className="mt-5">
        <DataTable columns={columns} data={departments} />
      </div>
    </div>
    }</>
  );
}

export default DepartmentList;
