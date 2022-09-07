"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const validators_1 = require("../middlewares/validators");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const User_1 = __importDefault(require("../models/User"));
const utils_1 = require("../utils");
;
const router = (0, express_1.Router)();
router.post("/login", validators_1.loginValidator, passport_1.default.authenticate("local"), UserController_1.default.loginUser);
router.post("/register", validators_1.registerValidator, UserController_1.default.registerUser);
router.get("/login/failed", UserController_1.default.loginFailed);
router.get("/login/success", UserController_1.default.loginSuccess);
router.get('/logout', UserController_1.default.logoutUser);
// 3rd party authentication
router.get('/google', passport_1.default.authenticate('google', { scope: ['email', 'profile'] }));
router.get('/google/callback', passport_1.default.authenticate('google', {
    failureRedirect: "/login/failed"
}), (req, res, next) => {
    const currentUser = req.user;
    console.log("Login Success  above if", currentUser);
    req.logIn(User_1.default, err => {
        if (err)
            return next(err);
        console.log("Login Success User", User_1.default);
        console.log("Login Success currentUser", currentUser);
        const accessToken = (0, utils_1.generateToken)({ id: currentUser === null || currentUser === void 0 ? void 0 : currentUser._id, username: currentUser.username }, `${process.env.ACCESS_TOKEN_EXPIRATION_TIME}`);
        const refreshToken = (0, utils_1.generateToken)({ id: currentUser === null || currentUser === void 0 ? void 0 : currentUser._id, username: currentUser.username }, `${process.env.REFRESH_TOKEN_EXPIRATION_TIME}`);
        console.log("Login Success Current Username:", currentUser.username);
        console.log("Login Success User Token", { id: currentUser._id, accessToken, refreshToken, authProvider: currentUser.authProvider, username: currentUser.username });
        res.status(200).send({ id: currentUser._id, accessToken, refreshToken, authProvider: currentUser.authProvider, username: currentUser.username });
    });
});
router.get('/linkedin', passport_1.default.authenticate('linkedin', { state: 'SOME STATE' }));
router.get('/linkedin/callback', passport_1.default.authenticate('linkedin', { failureRedirect: "/login/failed", successRedirect: "https://daily-sleep-tracker.netlify.app/login" }));
router.get('/facebook', passport_1.default.authenticate('facebook', { scope: ["email"] }));
router.get('/facebook/callback', passport_1.default.authenticate('facebook', { failureRedirect: "/login/failed", successRedirect: "https://daily-sleep-tracker.netlify.app/login" }));
exports.default = router;
