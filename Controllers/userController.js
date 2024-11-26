
import { User } from "../Model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config();

const salt=  10;
const privateKey = process.env.KEY;
// Add user 
export const Adduser = async(req,res)=>{
    const{userName,Password,Role}= req.body;

    try{
        if(!userName){return res.status(204).json({message:"UserName is required",isSuccess:false});}
        if(!Password){return res.status(204).json({message:"Password is required",isSuccess:false});}
        if(!Role){return res.status(204).json({message:"Role is required",isSuccess:false});}
        //hash the password
        let existuser = await User.findOne({userName:userName});
        if(existuser){
            return res.status(409).json({message:"Username is already Exist please user another Username",isSuccess:false})
        }

        const hashpass = bcrypt.hashSync(Password, salt);
        let newUser = new User({
            userName:userName,
            Password:hashpass,
            Role:Role
        })
        
        await newUser.save();
        let token = jwt.sign({data:newUser}, privateKey,{ expiresIn: '1d' });
        return res.status(200).json({message:"Successfully Created User",isSuccess:true,userID:newUser._id,userName:newUser.userName,Role:newUser.Role,token})
    }catch(error){
        return res.status(404).json({message:error.message,isSuccess:false})
    }
}


export const loginUser = async(req,res)=>{
    const {userName,Password} = req.body;
    try{
      let findUser = await User.findOne({userName:userName});
      if(!findUser){
        return res.status(404).json({message:"Invalid Credentials",isSuccess:false})
      }
      
     let password = bcrypt.compareSync(Password, findUser.Password);
     if(!password){
        return res.status(404).json({message:"Invalid Credentials",isSuccess:false})
     } 
     let token = jwt.sign({data:findUser}, privateKey,{ expiresIn: '1d' });
     findUser.Password = undefined;
     return res.status(200).json({message:"Successfully Login",isSuccess:true,data:findUser,token})

    }catch(error){
        console.log(error);
        return res.status(404).json({message:error.message,isSuccess:false})
    }
}

