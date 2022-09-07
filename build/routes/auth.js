"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const validators_1 = require("../middlewares/validators");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const router = (0, express_1.Router)();
router.post("/login", validators_1.loginValidator, passport_1.default.authenticate("local"), UserController_1.default.loginUser);
router.post("/register", validators_1.registerValidator, UserController_1.default.registerUser);
router.get("/login/failed", UserController_1.default.loginFailed);
router.get("/login/success", UserController_1.default.loginSuccess);
router.get('/logout', UserController_1.default.logoutUser);
// 3rd party authentication
router.get('/google', passport_1.default.authenticate('google', { scope: ['email', 'profile'] }));
router.get('/google/callback', passport_1.default.authenticate('google', {
    failureRedirect: "/login/failed",
    // successRedirect: "http://localhost:3000/login",
    successRedirect: "https://daily-sleep-tracker.netlify.app/login",
}));
router.get('/linkedin', passport_1.default.authenticate('linkedin', { state: 'SOME STATE' }));
// router.get('/linkedin/callback', passport.authenticate('linkedin', {failureRedirect: "/login/failed", successRedirect: "http://localhost:3000/login"}));
router.get('/linkedin/callback', passport_1.default.authenticate('linkedin', { failureRedirect: "/login/failed", successRedirect: "https://daily-sleep-tracker.netlify.app/login" }));
router.get('/facebook', passport_1.default.authenticate('facebook', { scope: ["email"] }));
router.get('/facebook/callback', 
// passport.authenticate('facebook', {failureRedirect: "/login/failed", successRedirect: "http://localhost:3000/login"}))
passport_1.default.authenticate('facebook', { failureRedirect: "/login/failed", successRedirect: "https://daily-sleep-tracker.netlify.app/login" }));
exports.default = router;
