import { useNavigate } from "react-router-dom";
import axios from "axios";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    sortable : true
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const DepartmentButtons = ({ _id, ondepartmentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    console.log("Deleting department with ID:", id); 
    const confirm = window.confirm(
      "Are you sure you want to delete this department?"
    );

    if (confirm) {
      try {
        const res = await axios.delete(
          `http://localhost:3000/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (res.data.success) {
          alert("Department deleted successfully.");
          ondepartmentDelete(); // Call the parent function to update state
        } else {
          alert(res.data.error || "Failed to delete the department.");
        }
      } catch (error) {
        alert(
          error.response?.data?.error || "An unexpected error occurred. Please try again."
        );
        console.error("Error deleting department:", error);
      }
    }
  };

  return (
    <div className="flex space-x-3">
      <button
        className="px-3 py-1 bg-teal-700 text-white rounded"
        onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-red-600 text-white rounded"
        onClick={() => handleDelete(_id)}
      >
        Delete
      </button>
    </div>
  );
};
