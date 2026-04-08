import mongoose from "mongoose";

export const connectDb = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected : ",conn.connection.host);
    }
    catch(error){
        console.error("Error connecting to MONGODB : ", error);
        process.exit(1) // 1 status code for fail and 0 for pass
    }
}