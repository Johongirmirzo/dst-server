"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (currentUser, expiresIn) => {
    return jsonwebtoken_1.default.sign({ id: currentUser.id, username: currentUser.username }, `${process.env.PRIVATE_KEY}`, { expiresIn });
};
exports.generateToken = generateToken;
