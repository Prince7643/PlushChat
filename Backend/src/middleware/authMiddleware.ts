import { NextFunction ,Response} from "express";
import jwt from "jsonwebtoken";
import { createRequest } from "../Types/interface";

const protect =(req:createRequest,res:Response,next:NextFunction)=>{
    try {
        let token =req.cookies.token;
        if(token){
        jwt.verify(token,process.env.JWT_SECRET as string,(err:any,decoded:any)=>{
            if(err){
                return res.status(401).json({message:"Invalid token"});
            }else{
                req.user=decoded;
                next();
            }
        });
        }else{
            return res.status(401).json({message:"No token provided"});
        }
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}
export default protect;