import User from "./models/User.js"
import bcrypt from 'bcrypt'
import connecttoDB from "./db/db.js"

const userRegister  = async () =>{
    connecttoDB()
    try {
        const existingUser = await User.findOne({ email: 'admin@gmail.com' });
        if (existingUser) {
            console.log('Admin user already exists.');
            return;
        }
        const hashPassword = await bcrypt.hash("admin" , 10)
        const newUser =  new User({
            name :"Admin" ,
            email :'admin@gmail.com',
            password : hashPassword,
            role :'admin',
        })
        await newUser.save()
    } catch (error) {
        console.log(error)
    }
}

userRegister();
