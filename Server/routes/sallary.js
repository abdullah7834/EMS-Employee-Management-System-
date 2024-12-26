import express from "express";
 const router = express.Router()

import verifyUser from "../middleWare/authmiddleWare.js";
import { addSallary, getSallary } from "../controllers/sallaryController.js";



router.post('/add' , verifyUser , addSallary )
router.get('/:id' , verifyUser , getSallary  )










 export default router;
