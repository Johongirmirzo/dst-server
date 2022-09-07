import {Router, Request, Response, NextFunction} from "express"
import passport from "passport"
import { registerValidator, loginValidator } from "../middlewares/validators";
import UserController from "../controllers/UserController"
import User, {UserDocument} from "../models/User"
import {generateToken} from "../utils";;

const router = Router();

interface AuthProviderData extends UserDocument {
  authProvider: string;
}

router.post("/login", loginValidator, passport.authenticate("local"), UserController.loginUser)
router.post("/register", registerValidator, UserController.registerUser)
router.get("/login/failed", UserController.loginFailed)
router.get("/login/success", UserController.loginSuccess);
router.get('/logout', UserController.logoutUser);

// 3rd party authentication
router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }))
router.get('/google/callback', 
  passport.authenticate('google', {
    failureRedirect: "/login/failed"
}), (req: Request, res: Response, next: NextFunction)=>{
  const currentUser = req.user as AuthProviderData;
        console.log("Login Success  above if", currentUser)
        req.logIn(User, err =>{
            if(err) return next(err);
            console.log("Login Success User", User)
            console.log("Login Success currentUser", currentUser)
            const accessToken = generateToken({id: currentUser?._id, username: currentUser.username}, `${process.env.ACCESS_TOKEN_EXPIRATION_TIME}`)
            const refreshToken = generateToken({id: currentUser?._id, username: currentUser.username}, `${process.env.REFRESH_TOKEN_EXPIRATION_TIME}`);
            console.log("Login Success Current Username:", currentUser.username)
            console.log("Login Success User Token", {id: currentUser._id, accessToken, refreshToken, authProvider: currentUser.authProvider, username: currentUser.username})
            res.status(200).send({id: currentUser._id, accessToken, refreshToken, authProvider: currentUser.authProvider, username: currentUser.username});
            
        })
});

router.get('/linkedin',
  passport.authenticate('linkedin', { state: 'SOME STATE'  }));
router.get('/linkedin/callback', passport.authenticate('linkedin', {failureRedirect: "/login/failed", successRedirect: "https://daily-sleep-tracker.netlify.app/login"}));

router.get('/facebook',
  passport.authenticate('facebook', {scope: ["email"]}));
router.get('/facebook/callback',
  passport.authenticate('facebook', {failureRedirect: "/login/failed", successRedirect: "https://daily-sleep-tracker.netlify.app/login"}))

export default router;
