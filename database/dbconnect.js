import mongoose from "mongoose";
//connection string
export const connect =async()=>{
    try{
        await mongoose.connect(`${process.env.MongoDB}`);
        console.log("Connected to MongoDB")

    }
    catch(error)
  {
    console.log(error);
    process.exit(1);
  }
}