import React, { useEffect, useState } from "react";
import { LeaveButtons } from "../utils/LeaveHelpers";
import DataTable from "react-data-table-component";
import axios from "axios";
import { columns } from "../utils/LeaveHelpers";
function Table() {
  const [leaves, setLeaves] = useState(null);
  const [filteredleaves, setfilteredLeaves] = useState(null);
  const fetchLeaves = async () => {
    try {
      const res = await axios.get("https://ems-employee-management-system-api.vercel.app/api/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        let sno = 1;
        const data = res.data.leaves.map((leave) => ({
          id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId?.employeeId,
          name: leave.employeeId.userId?.name || "Unknown",
          leaveType: leave.leaveType,
          department: leave.employeeId.department?.dep_name,
          days:
            new Date(leave.endDate).getDate() -
            new Date(leave.startDate).getDate(),
          status: leave.status,
          action: <LeaveButtons _id={leave._id} />,
        }));
      
        setLeaves(data);
        setfilteredLeaves(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        console.error("An unexpected error occurred:", error.response.data.error);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);
  const filterByInput = (e) => {
    const data = leaves.filter((leave) =>
      leave.employeeId.
    toLowerCase().includes(e.target.value.toLowerCase()));

    setfilteredLeaves(data);
  };
  const filterByButtons = (status) => {
    const data = leaves.filter((leave) =>
      leave.status
    .toLowerCase().
    includes(status.toLowerCase())
    );

    setfilteredLeaves(data);
  };
  return (
    <>
      {filteredleaves ? (
        <div className="p-5">
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold">Manage Leave</h3>
          </div>

          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search by Emp Id"
              className="px-4 py-0.5 border rounded"
              onChange={filterByInput}
            />
            <div className="space-x-3">
              <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700 rounded" onClick={()=> filterByButtons("Pending")}>
                Pending
              </button>
              <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700 rounded"  onClick={()=> filterByButtons("Approved")}>
                Approved
              </button>
              <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700 rounded"  onClick={()=> filterByButtons("Rejected")}>
                Rejected
              </button>
            </div>
          </div>
          <div className="mt-3">
            <DataTable columns={columns} data={filteredleaves} pagination />
          </div>
        </div>
      ) : (
        <div>Loading .....</div>
      )}
    </>
  );
}

export default Table;
