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
exports.checkAuth = void 0;
const reissueAccessToken_1 = require("../utils/reissueAccessToken");
const User_1 = __importDefault(require("../models/User"));
const decodedToken_1 = require("../utils/decodedToken");
const checkAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const accessToken = authHeader.split(" ")[1];
        const refreshToken = req.headers.refreshtoken ? req.headers.refreshtoken.split(" ")[1] : "";
        if (accessToken) {
            const { decoded, expired } = (0, decodedToken_1.decodedToken)(accessToken);
            if (decoded) {
                const user = yield User_1.default.findOne({ _id: decoded.id });
                req.user = user;
                req.userData = decoded;
                return next();
            }
            if (expired && refreshToken) {
                const accessToken = (0, reissueAccessToken_1.reissueAccessToken)(refreshToken);
                if (accessToken) {
                    res.setHeader("access-token", accessToken);
                    const { decoded } = (0, decodedToken_1.decodedToken)(accessToken);
                    const user = yield User_1.default.findOne({ _id: decoded.id });
                    req.user = user;
                    req.userData = decoded;
                    return next();
                }
                else {
                    res.status(401).send({ isLoginRequired: true, message: "You need to login to access the app" });
                }
            }
            else {
                res.status(401).send({ isLoginRequired: true, message: "Invalid/Expired Token" });
            }
        }
        else {
            res.status(401).send({ isLoginRequired: true, message: "Access Token 'Bearer [token]' is missing" });
        }
    }
    else {
        res.status(401).send({ isLoginRequired: true, message: "Authentication Header is missing" });
    }
});
exports.checkAuth = checkAuth;
