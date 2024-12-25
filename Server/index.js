import express from "express";
import cors from 'cors'
import dotenv from "dotenv"
import authROuter from './routes/authroutes.js'
import connecttoDB from "./db/db.js"
import  departmentRouter  from "./routes/department.route.js";
import employeeRouter   from  './routes/employee.js'

dotenv.config()

const app = express();
connecttoDB()
app.use(cors())
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json())  
// Above line will convert the data we are given to node js  into a JSON Format

app.use('/api/auth' , authROuter)
app.use('/api/department' , departmentRouter)     
app.use('/api/employee' , employeeRouter)     




app.listen(process.env.PORT , () =>{
    console.log(`Server is running on Port ${process.env.PORT}`);
})