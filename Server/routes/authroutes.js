import express from "express"
const router = express.Router();
import { login, verify } from "../controllers/authcontroler.js";
import verifyUser from "../middleWare/authmiddleWare.js";



router.post('/login' , login)
router.get('/verify' , verifyUser , verify)


export default router;