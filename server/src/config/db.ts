import mongoose from "mongoose";
import { DB } from "./env.global";

if(!DB.DBAPI){
    console.log("Missing DB Key")
};

async function connectDB(){
    try {
        if(!DB.DBAPI){
            throw new Error("DB KEY IS MISSING");
        };

        await mongoose.connect(DB.DBAPI);
        console.log("Connected to DB");
    } catch (error) {
        console.log("Server Issue", error);
        process.exit(1);
    }
}

export default connectDB;