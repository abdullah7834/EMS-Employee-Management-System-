import Department from "../models/Department.js";
import Employee from "../models/Employees.js";
import Leave from "../models/Leave.js";


export const AdminSummary = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    const totalDepartment = await Department.countDocuments();
    const totalSallaries = await Employee.aggregate([
      { $group: { _id: null, totalSallary: { $sum: "$sallary" } } },
    ]);
    const employeeAppliedForLeave = await Employee.distinct("employeeId");
    const leaveStatus = await Leave.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);
    const leaveSummary = {
      appliedFor: employeeAppliedForLeave.length,
      approved:
        leaveStatus.find((item) => item._id === "Approved")?.count || 0,
      rejected:
        leaveStatus.find((item) => item._id === "Rejected")?.count || 0,
      pending:
        leaveStatus.find((item) => item._id === "Pending")?.count || 0,
    };
    return res
      .status(200)
      .json({
        success: true,
        totalEmployees,
        totalDepartment,
        totalSallary: totalSallaries[0]?.totalSallary || 0,
        leaveSummary,

      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: error.message || "Admin Summary Error" });
  }
};
