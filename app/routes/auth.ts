import {Router} from "express"
import passport from "passport"
import { registerValidator, loginValidator } from "../middlewares/validators";
import UserController from "../controllers/UserController"

const router = Router();

router.post("/login", loginValidator, passport.authenticate("local"), UserController.loginUser)
router.post("/register", registerValidator, UserController.registerUser)
router.get("/login/failed", UserController.loginFailed)
router.get('/logout', UserController.logoutUser);

// 3rd party authentication
// router.get("/login/success", UserController.loginSuccess);
// router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }))
// router.get('/google/callback', 
//   passport.authenticate('google', {
//     failureRedirect: "/login/failed", 
//     // successRedirect: "http://localhost:3000/login",
//     successRedirect: "https://daily-sleep-tracker.netlify.app/login",
// }));

// router.get('/linkedin',
//   passport.authenticate('linkedin', { state: 'SOME STATE'  }));
// // router.get('/linkedin/callback', passport.authenticate('linkedin', {failureRedirect: "/login/failed", successRedirect: "http://localhost:3000/login"}));
// router.get('/linkedin/callback', passport.authenticate('linkedin', {failureRedirect: "/login/failed", successRedirect: "https://daily-sleep-tracker.netlify.app/login"}));

// router.get('/facebook',
//   passport.authenticate('facebook', {scope: ["email"]}));
// router.get('/facebook/callback',
//   // passport.authenticate('facebook', {failureRedirect: "/login/failed", successRedirect: "http://localhost:3000/login"}))
//   passport.authenticate('facebook', {failureRedirect: "/login/failed", successRedirect: "https://daily-sleep-tracker.netlify.app/login"}))

export default router;
