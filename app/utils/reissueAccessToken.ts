import { decodedToken } from "./decodedToken";
import {generateToken} from "./index";
import {DecodedToken} from "../types/types";

export const reissueAccessToken = (token: string)=>{
    const {decoded} = decodedToken(token) as DecodedToken;
    if(!decoded){
        return false;
    }
     
    const accessToken = generateToken({id: decoded.id, username: decoded.username}, "30m");
    return accessToken;
}