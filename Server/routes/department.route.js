import express from "express";
 const router = express.Router()
import { addDepartment, getDepartments } from "../controllers/department.js";
import verifyUser from "../middleWare/authmiddleWare.js";

router.get('/' , verifyUser , getDepartments )
router.post('/add' , verifyUser , addDepartment )








 export default router;
