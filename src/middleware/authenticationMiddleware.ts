import { NextFunction, Request, Response } from "express";
//import { tokenVal } from "../validations/tokenValid";
import { ExpandedRequest } from "../types/genTypes";
import database_models from "../database/config/db.config";
import { userValidate } from "../validations/signupValid";


export const signupMiddleware= (req:Request,res:Response,next:NextFunction)=>{
  const error = userValidate(req.body);
  if (error) {
    return res.json({
      status: 400,
      message: "BAD REQUEST",
      error: error.details[0].message.replace(/\"/g, ""),
    });
  }
  next();

}

// export const tokenValid = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.params.token;
//   const error = tokenVal({token:token});
//   if (error) {
//     return res.json({
//       status: 400,
//       message: "BAD REQUEST",
//       error: error.details[0].message.replace(/\"/g, ""),
//     });
//   }
//   next();
// };

// export const fetchToken = async (
//   req: ExpandedRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   const token = await database_models.Token.findOne({
//     where: { token: req.params.token },
//   });
//   if (!token) {
//     return res.json({
//       status: 404,
//       message: "no token for verification found",
//     });
//   }
//   req.token = token?.dataValues?.token;
//   next();
// };
