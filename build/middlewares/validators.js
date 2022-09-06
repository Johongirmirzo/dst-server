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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleepEntryValidator = exports.loginValidator = exports.registerValidator = void 0;
const registerSchema_1 = require("../schemas/registerSchema");
const loginSchema_1 = require("../schemas/loginSchema");
const sleepEntrySchema_1 = require("../schemas/sleepEntrySchema");
const registerValidator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield registerSchema_1.registerSchema.validate(Object.assign({}, req.body), { abortEarly: false });
        next();
    }
    catch (err) {
        res.status(400).send(err.errors);
    }
});
exports.registerValidator = registerValidator;
const loginValidator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield loginSchema_1.loginSchema.validate(Object.assign({}, req.body), { abortEarly: false });
        next();
    }
    catch (err) {
        res.status(400).send(err.errors);
    }
});
exports.loginValidator = loginValidator;
const sleepEntryValidator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sleepEntrySchema_1.sleepEntrySchema.validate(Object.assign({}, req.body), { abortEarly: false });
        next();
    }
    catch (err) {
        res.status(400).send(err.errors);
    }
});
exports.sleepEntryValidator = sleepEntryValidator;
