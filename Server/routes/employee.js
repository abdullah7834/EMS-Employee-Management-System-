import express from "express";
 const router = express.Router()
// import { getEmployee, addEmployee, viewEmployee , UpdateEmployee, deleteEmployee } from "../controllers/department.js";
import {  addEmployee, upload  } from "../controllers/employees.js";
import verifyUser from "../middleWare/authmiddleWare.js";

// router.get('/' , verifyUser , getEmployee )
router.post('/add' , verifyUser , upload.single('image') ,  addEmployee )
// router.get('/:id' , verifyUser , viewEmployee )
// router.put('/:id' , verifyUser , UpdateEmployee )
// router.delete('/:id' , verifyUser , deleteEmployee)









 export default router;
