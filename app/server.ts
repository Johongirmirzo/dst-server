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

app.use(cors({
    origin: "https://daily-sleep-trackker.herokuapp.com",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));
console.log(22)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
 
app.use(session({ 
    secret: `${process.env.SESSION_SECRET}`, 
    resave: false, 
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.MONGODB_URL || "mongodb://localhost/dst"})
}))
app.use(passport.initialize());
app.use(passport.session());


app.use("/auth", auth)
app.use("/api/sleepEntry", sleepEntry)

console.log("WOOOOOORRRKKING!")
const PORT = process.env.PORT || 5500;
app.listen(PORT, ()=>{
    connectDB()
    console.log(`Server is listening at port ${PORT}`);
})