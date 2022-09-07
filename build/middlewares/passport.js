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
const passport_local_1 = require("passport-local");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_linkedin_oauth2_1 = require("passport-linkedin-oauth2");
const passport_facebook_1 = require("passport-facebook");
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const PassportStrategies = (passport) => {
    // Local Strategy
    passport.use(new passport_local_1.Strategy({ usernameField: "email" }, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return done(null, false, { message: "You are not registered." });
        }
        if (!(yield bcrypt_1.default.compare(password, user.password))) {
            return done(null, false, { message: "Password did not match" });
        }
        else {
            return done(null, user);
        }
    })));
    passport.serializeUser((user, done) => {
        console.log(user, "Passport Local Serialize");
        done(null, user._id);
    });
    passport.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
        User_1.default.findById(id, (err, user) => done(err, user));
    }));
    //  Google Strategy
    passport.use(new passport_google_oauth20_1.Strategy({
        clientID: `${process.env.GOOGLE_CLIENT_ID}`,
        clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
        callbackURL: "https://daily-sleep-trackker.herokuapp.com/auth/google/callback"
    }, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = {
            id: profile.id,
            username: profile.displayName,
            email: profile._json.email,
            password: yield bcrypt_1.default.hash(Date.now().toString(), 10),
            authProvider: profile.provider
        };
        console.log(profile.id, profile.displayName, "Google Strategy");
        try {
            let user = yield User_1.default.findOne({ id: profile.id });
            if (user) {
                done(null, user);
            }
            else {
                user = yield User_1.default.create(newUser);
                done(null, user);
            }
            ;
        }
        catch (err) {
            console.log(err);
        }
    })));
    passport.serializeUser((user, done) => {
        console.log(user.id, "Passport Google Serializeeee");
        done(null, user._id);
    });
    passport.deserializeUser((id, done) => {
        User_1.default.findById(id, (err, user) => done(err, user));
    });
    // Linkeding Strategy
    passport.use(new passport_linkedin_oauth2_1.Strategy({
        clientID: `${process.env.LINKEDIN_CLIENT_ID}`,
        clientSecret: `${process.env.LINKEDIN_CLIENT_SECRET}`,
        callbackURL: "https://daily-sleep-trackker.herokuapp.com/auth/linkedin/callback",
        scope: ['r_emailaddress', 'r_liteprofile']
    }, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = {
            id: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            password: yield bcrypt_1.default.hash(Date.now().toString(), 10),
            authProvider: profile.provider
        };
        try {
            let user = yield User_1.default.findOne({ id: profile.id });
            if (user) {
                done(null, user);
            }
            else {
                user = yield User_1.default.create(newUser);
                done(null, user);
            }
            ;
        }
        catch (err) {
            console.log(err);
        }
        // process.nextTick(function () {
        //   return done(null, profile);
        // });
    })));
    passport.serializeUser((user, done) => {
        console.log(user, "Passport Linkedin Serialize");
        done(null, user._id);
    });
    passport.deserializeUser((id, done) => {
        User_1.default.findById(id, (err, user) => done(err, user));
    });
    // Facebook Strategy
    passport.use(new passport_facebook_1.Strategy({
        clientID: `${process.env.FACEBOOK_CLIENT_ID}`,
        clientSecret: `${process.env.FACEBOOK_CLIENT_SECRET}`,
        callbackURL: "https://daily-sleep-trackker.herokuapp.com/auth/facebook/callback",
        profileFields: ['id', 'emails', 'name', "displayName"]
    }, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = {
            id: profile.id,
            username: profile.displayName,
            email: profile._json.email || "",
            password: yield bcrypt_1.default.hash(Date.now().toString(), 10),
            authProvider: profile.provider
        };
        try {
            let user = yield User_1.default.findOne({ id: profile.id });
            if (user) {
                done(null, user);
            }
            else {
                user = yield User_1.default.create(newUser);
                done(null, user);
            }
            ;
        }
        catch (err) {
            console.log(err);
        }
    })));
    passport.serializeUser((user, done) => {
        console.log(user, "Passport Facebook Serialize");
        done(null, user._id);
    });
    passport.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
        User_1.default.findById(id, (err, user) => done(err, user));
    }));
};
exports.default = PassportStrategies;
