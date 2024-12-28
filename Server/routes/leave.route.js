import express from 'express'
 const router = express.Router()
 import verifyUser from '../middleWare/authmiddleWare.js'
import { addLeave, getLeave, getLeaves , getLeaveDetails ,updateLeave} from '../controllers/leaveController.js'


router.post('/add' , verifyUser , addLeave )
router.get('/detail/:id' , verifyUser , getLeaveDetails )
router.get('/:id/:role' , verifyUser , getLeave )
router.get('/' ,verifyUser , getLeaves)
router.put('/:id' , verifyUser , updateLeave )





export default router