import { NextFunction, Request, Response } from "express";
import {reissueAccessToken} from "../utils/reissueAccessToken";
import {DecodedToken, Token} from "../types/types";
import User, {UserDocument} from "../models/User";
import {decodedToken} from "../utils/decodedToken";


export const checkAuth = async (req: Request, res: Response, next: NextFunction)=>{ 
    const authHeader = req.headers.authorization
    if(authHeader){
        const accessToken = authHeader.split(" ")[1];
        const refreshToken = (req.headers.refreshtoken as string) ?  (req.headers.refreshtoken as string).split(" ")[1] : "";
        if(accessToken){
            const {decoded, expired} = decodedToken(accessToken) as DecodedToken;
            if(decoded){
                const user = await User.findOne({_id: decoded.id}) as UserDocument;
                req.user = user;
                req.userData = decoded as Token;
               return next()
           }
           if(expired && refreshToken){
             const accessToken = reissueAccessToken(refreshToken);
             if(accessToken){
                res.setHeader("access-token", accessToken);
                const {decoded} = decodedToken(accessToken) as DecodedToken;
                const user = await User.findOne({_id: decoded.id}) as UserDocument;
                req.user = user;
                req.userData = decoded as Token;
                return next();
             } else {
                res.status(401).send({isLoginRequired: true, message: "You need to login to access the app"})
             }
           } else {
            res.status(401).send({isLoginRequired: true, message: "Invalid/Expired Token"})
           }   
        } else {
            res.status(401).send({isLoginRequired: true, message: "Access Token 'Bearer [token]' is missing"})
        }
    } else {
        res.status(401).send({isLoginRequired: true, message: "Authentication Header is missing"});
    }   
 }