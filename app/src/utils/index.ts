import jwt from "jsonwebtoken";

interface User {
    id: string;
    username: string;
}

export const generateToken = (currentUser: User, expiresIn: string)=>{
    return jwt.sign({id: currentUser.id, username: currentUser.username}, `${process.env.PRIVATE_KEY}`, {expiresIn})
}