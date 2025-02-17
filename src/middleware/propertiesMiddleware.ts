import { NextFunction, Response } from "express";
import { propValidFun } from "../validations/propertiesValid";
import { ExpandedRequest } from "../types/genTypes";
import database_models from "../database/config/db.config";
import { validateuuid } from "../validations/validateUuid";
import { validateToken } from "../utils/decodeToken";
import { TOKEN_SECRET } from "../utils/key";
import { getRoleByName } from "../utils/userUtils";

export const propValidation = (
  req: ExpandedRequest,
  res: Response,
  next: NextFunction
) => {
  const error = propValidFun(req.body);
  if (error) {
    return res.json({
      status: 400,
      message: "BAD REQUEST",
      error: error.details[0].message.replace(/\"/g, ""),
    });
  }
  next();
};

export const isPublisherExist = async (
  req: ExpandedRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.body.hostId) {
    const publisherId = await database_models.User.findOne({
      where: { email: req.body.hostId },
    });
    if (!publisherId) {
      return res.json({
        status: 400,
        message: "bad request hostId doesn't exist",
      });
    }
    req.hostId = publisherId.id;
  }
  next();
};

export const IdValidated = (field: string) => {
  return async (req: ExpandedRequest, res: Response, next: NextFunction) => {
    const uuid = req.params[field];
    const isValid = validateuuid(uuid);
    if (!isValid) {
      return res.status(400).json({
        message: "BAD REQUEST",
        Error: "provided id is not uuid",
      });
    }
    next();
  };
};

export const isPropertAvailable = (field: string) => {
  return async (req: ExpandedRequest, res: Response, next: NextFunction) => {
    try {
      const id = req.body[field] || req.params[field];
      const property = await database_models.Property.findOne({
        where: { id },
      });
      if (!property) {
        return res.json({
          status: 404,
          message: "Not found",
          Error: "property doesn't exist",
        });
      }
      req.property = property;
      next();
    } catch (error) {
      return res.status(500).json({
        message: "SERVER ERROR",
        error,
      });
    }
  };
};

export const checkUserRole = (requiredRole: string) => {
  return async (req: ExpandedRequest, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ") || "";
      const validToken = validateToken(token[1], TOKEN_SECRET as string);
      req.validUser = validToken.user;
      const role = await getRoleByName(requiredRole);
      if (req.validUser?.role !== role?.id) {
        return res.status(403).json({
          message: `Forbidden: You don't have permission to perform this action`,
        });
      }
      next();
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
};
