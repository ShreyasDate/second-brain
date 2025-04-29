import { NextFunction, Request , Response } from "express";
import jwt  from "jsonwebtoken";

import { JWT_SECRET } from "./config";

export const userMiddleware = (req : Request,res : Response,next : NextFunction)=>{
    try {
        const authToken = req.headers['authorization'];
        const decoded = jwt.verify(authToken as string,JWT_SECRET)
        if (decoded) {
            //@ts-ignore
            req.userId = decoded.id;
            next()
        }else{
            res.status(403).json({
                message : "You are not logged in"
            })
        }
    } catch (error) {
        res.status(403).json({
            message : "failed authentication",
            error : error
        })
    }
    
}