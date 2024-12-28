import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()
const connecttoDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URL ,  {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
    } catch (error) {
        console.log(error)
    }
}

export default connecttoDB