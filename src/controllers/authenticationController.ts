import { NextFunction, Response, Request } from "express";
import passport from "../middleware/passport";
import { UserModelAttributes } from "../types/models";
import { generateToken } from "../utils/generateToken";
import database_models from "../database/config/db.config";
import { ExpandedRequest } from "../types/genTypes";
import { TOKEN_SECRET } from "../utils/key";
import { getRoleByName } from "../utils/userUtils";

interface InfoAttribute {
  message: string;
}

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.body) {
      passport.authenticate(
        "signup",
        (err: Error, user: UserModelAttributes, info: InfoAttribute) => {
          if (info) {
            return res.json({ status: 409, message: info.message });
          }
          req.login(user, async () => {
            const token = generateToken({
              id: user.id as string,
              email: user.email as string,
            });
            return res.json({
              status: 201,
              message:
                "Account Created successfully",
              token: token,
            });
          });
        }
      )(req, res, next);
    }
  } catch (error) {
    return res.status(500).json({
      status: "SERVER ERROR",
      message: "Something went wrong!",
    });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "login",
    (error: Error, user: UserModelAttributes, info: InfoAttribute) => {
      if (error) {
        return res.status(400).json({ status: 400, message: "Bad Request!" });
      }
      if (info) {
        return res.status(400).json({ message: info.message });
      }
      (req as any).login(user, async (err: Error) => {
        if (err) {
          return res.status(400).json({ status: 400, message: "Bad Request!" });
        }
        const authenticationtoken = generateToken({
          id: user.id as string,
          email: user.email as string,
        });
        return res
          .status(200)
          .json({ message: "Login successfully!", token: authenticationtoken });
      });
    }
  )(req, res, next);
};

export const googleAuthInit = async (req: Request, res: Response) => {
  passport.authenticate("google", { scope: ["profile", "email"] });
  res.redirect("/api/auth/google/callback");
};

export const loginWithGoogle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    passport.authenticate(
      "google",
      async (err: Error, user: UserModelAttributes) => {
        if (err) {
          return res.status(400).json({ status: 400, message: "Bad Request!" });
        }
        const userExist = await database_models.User.findOne({
          where: { email: user.email },
        });

        if (userExist) {
          const authenticationtoken = generateToken({
            id: user.id as string,
            email: user.email as string,
          });
          return res.status(200).json({
            message: "Login successfully!",
            token: authenticationtoken,
          });
        }
        const role = await getRoleByName("Renters");

        const newUser = await database_models.User.create({
          ...user,
          role: role?.dataValues.id as string,
        });
        return res.json({
          status: 201,
          message: "Account Created successfully",
          newUser,
        });
      }
    )(req, res, next);
  } catch (error) {
    return res.status(500).json({
      message: "SERVER ERROR",
    });
  }
};


