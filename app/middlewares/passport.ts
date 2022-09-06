import {Strategy as LocalStrategy} from "passport-local";
import {Strategy as GoogleStrategy} from "passport-google-oauth20"
import {Strategy as LinkedinStrategy} from "passport-linkedin-oauth2"
import {Strategy as FacebookStrategy} from "passport-facebook"
import passport from "passport"
 
import bcrypt from "bcrypt";
import User, {UserDocument} from "../models/User"
 
 

export const localStrategy = ()=>{
    passport.use(new LocalStrategy({usernameField: "email"}, async (email, password, done)=>{
        const user = await User.findOne<UserDocument>({email});
        if(!user){
            return done(null, false, {message: "You are not registered."});
        }
        if(!(await bcrypt.compare(password, user.password))){
            return done(null, false, {message: "Password did not match"});
        } else {
            return done(null, user);
        }
    }));
    passport.serializeUser((user: any, done)=>{
      console.log(user._id, user, "Passport Local Serialize")
      done(null, user._id);
    });
    
    passport.deserializeUser(async (id, done)=> {
      try {
          // console.log(id, "Passport Local Deserialize");
          const user = await User.findById(id);
          done(null, user);
        }catch(err){
          done(err, false)
        }
      });
}

export const googleStrategy = ()=>{
  passport.use(new GoogleStrategy({
    clientID: `${process.env.GOOGLE_CLIENT_ID}`,
    clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    callbackURL: "http://localhost:5500/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) =>{
     
     
     const newUser = {
      id: profile.id,
      username: profile.displayName,
      email: profile._json.email,
      password: await bcrypt.hash(Date.now().toString(), 10),
      authProvider: profile.provider
     }
     console.log(profile.id, profile.displayName, "Google Strategy");
     try {
       let user = await User.findOne({id: profile.id});
       if(user){
        done(null, user);
       }else {
        user = await User.create(newUser);
        done(null, user);
       };
     }catch(err){
      console.log(err)
     } 
  }
));
passport.serializeUser((user: any, done)=>{
  console.log(user._id, "Passport Google Serializeeee");
  done(null, user._id);
});

passport.deserializeUser(async (id, done)=> {
  try {
    console.log(id, "Passport Google Deserialize");
    const user = await User.findById(id);
    done(null, user);
  }catch(err){
    done(err, false)
  }
});
}

export const linkedinStrategy = ()=>{
  passport.use(new LinkedinStrategy({
    clientID: `${process.env.LINKEDIN_CLIENT_ID}`,
    clientSecret: `${process.env.LINKEDIN_CLIENT_SECRET}`,
    callbackURL: "http://localhost:5500/auth/linkedin/callback",
    scope: ['r_emailaddress', 'r_liteprofile']
  }, async (accessToken, refreshToken, profile, done)=> {
    const newUser = {
      id: profile.id,
      username: profile.displayName,
      email: profile.emails[0].value,
      password: await bcrypt.hash(Date.now().toString(), 10),
      authProvider: profile.provider
     }
     try {
       let user = await User.findOne({id: profile.id});
       
       if(user){
        done(null, user);
       }else {
        user = await User.create(newUser);
        done(null, user);
       };
     }catch(err){
      console.log(err)
     } 
    // process.nextTick(function () {
    //   return done(null, profile);
    // });
  }));


  passport.serializeUser((user: any, done)=>{
    done(null, user._id);
  });
  
  passport.deserializeUser(async (id, done)=> {
    try {
      console.log(id, "Linkedin Local Deserialize");
      const user = await User.findById(id);
      done(null, user);
    }catch(err){
      done(err, false)
    }
  });
}

export const facebookStrategy = ()=>{
  passport.use(new FacebookStrategy({
    clientID: `${process.env.FACEBOOK_CLIENT_ID}`,
    clientSecret: `${process.env.FACEBOOK_CLIENT_SECRET}`,
    callbackURL: "http://localhost:5500/auth/facebook/callback",
    profileFields: ['id', 'emails', 'name', "displayName"]
  },
  async (accessToken, refreshToken, profile, done)=> {
    const newUser = {
      id: profile.id,
      username: profile.displayName,
      email: profile._json.email || "",
      password: await bcrypt.hash(Date.now().toString(), 10),
      authProvider: profile.provider
     }
     try {
       let user = await User.findOne({id: profile.id});
       if(user){
        done(null, user);
       }else {
        user = await User.create(newUser);
        done(null, user);
       };
     }catch(err){
      console.log(err)
     } 
  }
));
passport.serializeUser((user: any, done)=>{
  done(null, user._id);
});

passport.deserializeUser(async (id, done)=> {
  try {
    const user = await User.findById(id);
    done(null, user);
  }catch(err){
    done(err, false)
  }
});
}