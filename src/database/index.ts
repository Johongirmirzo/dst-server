import mongoose from "mongoose";

export const connectDB = async ()=>{
    try{
       await mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/dst");
       console.log("Database connection established")
    }catch(err){
        console.log(err);
    }
}