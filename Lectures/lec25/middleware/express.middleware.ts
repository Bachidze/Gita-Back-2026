import { Response,Request,NextFunction } from "express";

export function expressMidlleware(req:Request,res:Response,next:NextFunction){
    console.log("i am express middleware")
    next()
}