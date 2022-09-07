"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const utils_1 = require("../utils");
const router = (0, express_1.Router)();
const UserController = {
    registerUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { username, email, password } = req.body;
            const user = yield User_1.default.findOne({ $and: [{ username }, { email }] });
            if (user) {
                return res.send(["Username already exists", "Email already exists"]);
            }
            const userDuplicate = yield User_1.default.findOne({ username });
            if (userDuplicate) {
                return res.send(["Username already exists"]);
            }
            const emailDuplicate = yield User_1.default.findOne({ email });
            if (emailDuplicate) {
                return res.send(["Email already exists"]);
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            yield User_1.default.create({
                username,
                email,
                password: hashedPassword
            });
            res.status(201).json({ message: "User is successfully created" });
        }
        catch (err) {
            return next(err);
        }
    }),
    loginUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const currentUser = req.user;
        const accessToken = (0, utils_1.generateToken)({ id: currentUser === null || currentUser === void 0 ? void 0 : currentUser._id, username: currentUser.username }, `${process.env.ACCESS_TOKEN_EXPIRATION_TIME}`);
        const refreshToken = (0, utils_1.generateToken)({ id: currentUser === null || currentUser === void 0 ? void 0 : currentUser._id, username: currentUser.username }, `${process.env.REFRESH_TOKEN_EXPIRATION_TIME}`);
        res.status(200).json({ id: currentUser._id, accessToken, refreshToken, username: currentUser.username });
    }),
    loginFailed: (req, res) => {
        res.status(401).json({ error: true, message: "Log in Failure" });
    },
    loginSuccess: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const currentUser = req.user;
        console.log("Login Success above if", currentUser);
        if (currentUser) {
            const accessToken = (0, utils_1.generateToken)({ id: currentUser === null || currentUser === void 0 ? void 0 : currentUser._id, username: currentUser.username }, `${process.env.ACCESS_TOKEN_EXPIRATION_TIME}`);
            const refreshToken = (0, utils_1.generateToken)({ id: currentUser === null || currentUser === void 0 ? void 0 : currentUser._id, username: currentUser.username }, `${process.env.REFRESH_TOKEN_EXPIRATION_TIME}`);
            res.status(200).send({ id: currentUser._id, accessToken, refreshToken, authProvider: currentUser.authProvider, username: currentUser.username });
        }
        else {
            res.status(404).json({ message: "Internal Server Error" });
        }
    }),
    logoutUser: (req, res, next) => {
        req.logout((err) => {
            console.log(err, "Logout Error");
            if (err)
                return next(err);
            console.log(req.session);
            res.status(200).send("Successfully Logout");
        });
    }
};
exports.default = UserController;
