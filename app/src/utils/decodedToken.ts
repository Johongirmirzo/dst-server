import jwt from "jsonwebtoken";

export const decodedToken = (token: string)=>{
    try {
        const decoded = jwt.verify(token, `${process.env.PRIVATE_KEY}`);
        return {valid: true, expired: false, decoded}
    }catch(err: any) {
        return {
            valid: false,
            expired: err.message === "jwt expired",
            decoded: null
        }
    }
}