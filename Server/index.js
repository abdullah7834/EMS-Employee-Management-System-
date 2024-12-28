import express from "express";
import cors from 'cors'
import dotenv from "dotenv"
import authROuter from './routes/authroutes.js'
import connecttoDB from "./db/db.js"
import  departmentRouter  from "./routes/department.route.js";
import employeeRouter   from  './routes/employee.js'
import sallaryRouter from './routes/sallary.js'
import leaveRouter from  './routes/leave.route.js'
import settingRouter from  './routes/setting.js'
import dashboardRouter from './routes/dashboard.js'
dotenv.config()

const app = express();
connecttoDB()
app.use(cors())
app.use(express.static('public/uploads'))
app.use(cors({ origin: 'https://ems-employee-management-system-frontend.vercel.app' }));
app.use(express.json())  
// Above line will convert the data we are given to node js  into a JSON Format

app.use('/api/auth' , authROuter)
app.use('/api/department' , departmentRouter)     
app.use('/api/employee' , employeeRouter)   
app.use('/api/sallary', sallaryRouter) 
app.use('/api/leave' , leaveRouter) 
app.use('/api/setting' , settingRouter)
app.use('/api/dashboard' , dashboardRouter)






app.listen(process.env.PORT , () =>{
    console.log(`Server is running on Port ${process.env.PORT}`);
})