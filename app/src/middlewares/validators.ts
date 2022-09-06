import {Request, Response, NextFunction} from "express"
import {registerSchema} from "../schemas/registerSchema";
import {loginSchema} from "../schemas/loginSchema";
import {sleepEntrySchema} from "../schemas/sleepEntrySchema"

export const registerValidator = async (req: Request, res: Response, next: NextFunction)=>{
    try{ 
        await registerSchema.validate({...req.body}, {abortEarly: false})
        next()
    }catch(err: any){    
        res.status(400).send(err.errors)
    }
}

export const loginValidator = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        await loginSchema.validate({...req.body}, {abortEarly: false});
        next()
    }catch(err: any){
        res.status(400).send(err.errors)
    }
}

export const sleepEntryValidator = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        await sleepEntrySchema.validate({...req.body}, {abortEarly: false});
        next();
    }catch(err: any){
        res.status(400).send(err.errors)
    }
}