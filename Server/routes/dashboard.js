import express from 'express'
import verifyUser from '../middleWare/authmiddleWare.js'
import { AdminSummary } from '../controllers/dashboardController.js'

const router = express.Router()

router.get('/summary' , verifyUser , AdminSummary)


export default router