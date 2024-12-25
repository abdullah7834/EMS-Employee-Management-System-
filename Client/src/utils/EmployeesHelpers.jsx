import axios from "axios";
export const fetchDepartments = async () => {
    let departments 
    try {
      const res = await axios.get("http://localhost:3000/api/department", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
         departments = res.data.departments
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      alert(
        error.response?.data?.error || "Something went wrong. Please try again."
      );
    } 
    return departments
  };
