import express from "express"
const router = express.Router();
import { login, verify } from "../controllers/authcontroler.js";
import authmiddleWare from "../middleWare/authmiddleWare.js";



router.post('/login' , login)
router.get('/verify' , authmiddleWare , verify)


export default router;