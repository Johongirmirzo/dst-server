import {Request, Response, NextFunction, Router} from "express"
import bcrypt from "bcrypt"
import User, {UserDocument} from "../models/User"
import {generateToken} from "../utils";
import jwt from "jsonwebtoken";

const router = Router();

interface AuthProviderData extends UserDocument {
    displayName: string;
  }

const UserController = {
    registerUser: async (req: Request, res: Response, next: NextFunction) => {     
        try {
            const {username, email, password} = req.body;
             
            const user = await User.findOne({$and: [{username}, {email}]});
            if(user){
              return  res.send(["Username already exists", "Email already exists"])
            }
            const userDuplicate = await User.findOne({username});
            if(userDuplicate){
                return res.send(["Username already exists"])
            }
    
            const emailDuplicate = await User.findOne({email});
            if(emailDuplicate){
                return res.send(["Email already exists"])
            }
    
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create({
                username,
                email,
                password: hashedPassword
            })
            res.status(201).json({message: "User is successfully created"})  
        }catch(err){
            next(err)
        }
    },
    loginUser: async (req: Request, res: Response) => {
        const currentUser = req.user as UserDocument; 
        const accessToken = generateToken({id: currentUser?._id, username: currentUser.username}, `${process.env.ACCESS_TOKEN_EXPIRATION_TIME}`)
        const refreshToken = generateToken({id: currentUser?._id, username: currentUser.username}, `${process.env.REFRESH_TOKEN_EXPIRATION_TIME}`);
        console.log("Login Success and req.user", req.user);
        console.log("Login Success and currentUser", currentUser);
        console.log("Current Username:", currentUser.username)
        console.log("User Token", {id: currentUser._id, accessToken, refreshToken, authProvider: currentUser.authProvider, username: currentUser.username})
        res.status(200).json({id:currentUser._id, accessToken, refreshToken, username: currentUser.username});
    },
    loginFailed: (req: Request, res: Response)=>{
        res.status(401).json({error: true, message: "Log in Failure"})
    },
    loginSuccess: async (req: Request, res: Response)=>{
        const currentUser = req.user as AuthProviderData;
        const accessToken = generateToken({id: currentUser?._id, username: currentUser.username}, `${process.env.ACCESS_TOKEN_EXPIRATION_TIME}`)
        const refreshToken = generateToken({id: currentUser?._id, username: currentUser.username}, `${process.env.REFRESH_TOKEN_EXPIRATION_TIME}`);
        console.log("Login Success and req.user", req.user);
        console.log("Login Success and currentUser", currentUser);
        console.log("Current Username:", currentUser.username)
        console.log("User Token", {id: currentUser._id, accessToken, refreshToken, authProvider: currentUser.authProvider, username: currentUser.username})
        res.status(200).json({id: currentUser._id, accessToken, refreshToken, authProvider: currentUser.authProvider, username: currentUser.username});
    },
    logoutUser: (req: Request, res: Response, next: NextFunction)=> {
        req.logout((err)=> {
          console.log(err, "Logout Error")
          if (err) return next(err);
          res.status(200).send("Successfully Logout");
        });
    }
}

export default UserController