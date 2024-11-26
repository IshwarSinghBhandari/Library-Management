import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        trim:true, 
        lowercase:true
        
    },
    Password:{
        trim:true,
        type:String,
        required:true,
        minlength: [6, "Password must be at least 6 characters long"]
    },
    Role:{
        type:String,
        enum:["admin","user"]
    }


},{timestamps:true});
export const User = mongoose.model("User",userSchema);