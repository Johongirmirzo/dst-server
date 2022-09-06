declare namespace Express {
  export interface Request {
        user: {
            id: string;
            username: string;
            email: string;
            password: string;
        }
        userData: {
            id: string;
            username: string;
            iat: number;
            exp: number;
        }
    }
    interface headers extends Request {
        "x-refresh-token": string;
    }
}