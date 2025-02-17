import { Request } from "express";
import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import { hashPassword }  from "../utils/hashPassword";
import database_models from "../database/config/db.config";
import { isValidPassword } from "../utils/checkPass";
import {
  GOOGLE_CALLBACK_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_SECRET_ID,
} from "../utils/key";
import GooglePassport, { VerifyCallback } from "passport-google-oauth2";
import { getRoleByName } from "../utils/userUtils";

passport.serializeUser(function (user: any, done) {
  done(null, user);
});

passport.deserializeUser(function (user: any, done) {
  done(null, user);
});

passport.use(
  "signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, cb) => {
      try {
        const role = await getRoleByName("Renters");
        if (!role) {
        	return cb(null, false, { message: "No role found" });
        }
        const data = {
          email: email.trim(),
          password: await hashPassword(password),
          confirmPassword: await hashPassword(req.body.confirmPassword),
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          role: role?.dataValues.id as string,
        };
        const userExist = await database_models.User.findOne({
          where: {
            email: data.email,
          },
        });
        if (userExist) {
          return cb(null, false, { message: "User already exist!" });
        }
        const user = await database_models.User.create({ ...data });
        cb(null, user);
      } catch (error) {
        console.log('error',error)
        cb(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await database_models.User.findOne({
          where: { email },
        });
        const my_user = user?.toJSON();
        if (!user)
          return done(null, false, { message: "Wrong email or password!" });
        const currPassword = my_user?.password as string;

        const isValidPass = await isValidPassword(password, currPassword);
        if (!isValidPass) {
          return done(null, false, { message: "entered password is incorrect!" });
        }
        return done(null, my_user);
      } catch (error) {
        done(error);
      }
    }
  )
);
const GoogleStrategy = GooglePassport.Strategy;

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID as string,
      clientSecret: GOOGLE_SECRET_ID as string,
      callbackURL: GOOGLE_CALLBACK_URL as string,
      scope:['profile','email'],
      passReqToCallback: true,
    },
    (
      request: Request,
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: any
    ) => {
      const {emails, name}=profile;
      const user={
        firstName: name.givenName,
        lastName: name.familyName,
        email: emails[0].value,
        password: "",
        confirmPassword: "",
        isVerified: true,
      }
      return done(null, user);
    }
  )
);
export default passport;
