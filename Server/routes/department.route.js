import express from "express";
 const router = express.Router()
import { addDepartment, deleteDepartment, getDepartments , updateDepartment, viewDepartment } from "../controllers/department.js";
import verifyUser from "../middleWare/authmiddleWare.js";

router.get('/' , verifyUser , getDepartments )
router.post('/add' , verifyUser , addDepartment )
router.get('/:id' , verifyUser , viewDepartment )
router.put('/:id' , verifyUser , updateDepartment )
router.delete('/:id' , verifyUser , deleteDepartment)









 export default router;
