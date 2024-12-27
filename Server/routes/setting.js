import express from 'express'
import verifyUser from '../middleWare/authmiddleWare.js'
import { changePassword } from '../controllers/SettingController.js'

const router = express.Router()

router.put('/change-password' , verifyUser , changePassword)


export default router