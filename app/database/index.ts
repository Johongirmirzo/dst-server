import mongoose from "mongoose";

export const connectDB = async ()=>{
    try{
       await mongoose.connect(`${process.env.MONGODB_URL}`);
    //    await mongoose.connect("mongodb://localhost/dst");
       console.log("Database connection established")
    }catch(err){
        console.log(err);
    }
}