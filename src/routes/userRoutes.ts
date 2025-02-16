import express from "express";
import {
  googleAuthInit,
  login,
  loginWithGoogle,
  registerUser
} from "../controllers/authenticationController";
import {
  signupMiddleware 
} from "../middleware/authenticationMiddleware";

const userRoutes = express.Router();

userRoutes.post("/register", signupMiddleware as any, registerUser as any);
userRoutes.post("/login", login);
userRoutes.get("/auth/google", googleAuthInit);
userRoutes.get("/auth/google/callback", loginWithGoogle as any);
export default userRoutes;
