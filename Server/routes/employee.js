import express from "express";
 const router = express.Router()
// import { getEmployee, addEmployee, viewEmployee , UpdateEmployee, deleteEmployee } from "../controllers/department.js";
import {getEmployees,  addEmployee,viewEmployee , UpdateEmployee, fetchEmployeesByDepId, upload  } from "../controllers/employees.js";
import verifyUser from "../middleWare/authmiddleWare.js";

router.get('/' , verifyUser , getEmployees )
router.post('/add' , verifyUser , upload.single('image') ,  addEmployee )
router.get('/:id' , verifyUser , viewEmployee )
router.put('/:id' , verifyUser , UpdateEmployee )
router.get('/department/:id' , verifyUser , fetchEmployeesByDepId)









 export default router;
