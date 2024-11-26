import jwt from 'jsonwebtoken';


export const verifyToken = (req,res,next)=>{
    const token = req.get("Authorization").split("Bearer ")[1];
   
    if(!token){
        return res.status(403).json({message:"Access denied,no token Provided",isSuccess:false})
    }
    try{

        const decoded = jwt.verify(token,process.env.KEY);
        
     
        req.user = decoded.data;
      next();
      
    }catch(error){
        console.log(error);
        return res.status(404).json({message:"Invalid token ",isSuccess:false})
    }
}