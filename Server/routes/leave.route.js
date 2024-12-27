import express from 'express'
 const router = express.Router()
 import verifyUser from '../middleWare/authmiddleWare.js'
import { addLeave, getLeave } from '../controllers/leaveController.js'


router.post('/add' , verifyUser , addLeave )
router.get('/:id' , verifyUser , getLeave )





export default router