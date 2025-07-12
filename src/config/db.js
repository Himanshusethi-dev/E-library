import mongoose from "mongoose";
import { config } from "../config/config.js";

const connectDB = async ()=>{
    try {
        console.log('ffd',config.database_url)
        mongoose.connection.on("connected",()=>{
            console.log('Connected with Database')
        })
        await mongoose.connect(config.database_url)

    } catch (error) {
        console.log('Failed to connect with the Database')
        process.exit(1)
    }
}

export default connectDB;