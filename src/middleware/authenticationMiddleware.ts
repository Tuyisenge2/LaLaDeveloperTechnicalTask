import { NextFunction, Request, Response } from "express";
import { ExpandedRequest } from "../types/genTypes";
import database_models from "../database/config/db.config";
import { userValidate } from "../validations/signupValid";

export const signupMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = userValidate(req.body);
  if (error) {
    return res.json({
      status: 400,
      message: "BAD REQUEST",
      error: error.details[0].message.replace(/\"/g, ""),
    });
  }
  next();
};

export const isUserLoggedIn = async (
  req: ExpandedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const valTok= await database_models.blacklistedToken.findOne({where:{token}})
    if (!token || valTok) {
      return res.json({
        status: 401,
        message: "log in to access this route",
      });
    }
    next();
  } catch (error) {
    if (error) {
      return res.json({
        status: 500,
        message: "Server error occured",
        error: error,
      });
    }
  }
};

export const isLogout = async (req:ExpandedRequest, res:Response, next:NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  const isBlacklisted = await database_models.blacklistedToken.findOne({ where: { token } });
  if (isBlacklisted) return res.status(401).json({ error: "you are already logout" });
  try {
    next();
  } catch (error) {
   return  res.status(500).json({
    message: "SERVER ERROR",
    error
  });
  }
};