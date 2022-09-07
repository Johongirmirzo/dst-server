import dotenv from "dotenv";
dotenv.config();
import express, {Request} from "express";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo"; 
import cors from "cors";
import auth from "./routes/auth"
import sleepEntry from "./routes/sleepEntry";
import {connectDB} from "./database/index"
import {localStrategy, googleStrategy, linkedinStrategy, facebookStrategy} from "./middlewares/passport";

const app = express();

// authenticate user through passport strategy
(function(){
    localStrategy();
    googleStrategy();
    linkedinStrategy();
    facebookStrategy();
})()

app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
});
 
// app.use(cors());
// app.use(cors({
//     origin: "http://localhost:3000",
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true
// }));
 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
 
app.use(session({ 
    secret: `${process.env.SESSION_SECRET}`, 
    resave: false, 
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.MONGODB_URL}) 
}))
app.use(passport.initialize());
app.use(passport.session());
 
app.use("/auth", auth)
app.use("/api/sleepEntry", sleepEntry)

 
const PORT = process.env.PORT || 5500;
app.listen(PORT, ()=>{
    connectDB()
    console.log(`Server  is listening at port ${PORT}`);
})