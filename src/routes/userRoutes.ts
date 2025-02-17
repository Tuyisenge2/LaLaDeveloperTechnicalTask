import express from "express";
import {
  googleAuthInit,
  login,
  loginWithGoogle,
  logout,
  registerUser
} from "../controllers/authenticationController";
import {
  isLogout,
  signupMiddleware 
} from "../middleware/authenticationMiddleware";

const userRoutes = express.Router();

userRoutes.post("/register", signupMiddleware as any, registerUser as any);
userRoutes.post("/login", login);
userRoutes.post("/logout",isLogout as any,logout as any );

userRoutes.get("/auth/google", googleAuthInit);
userRoutes.get("/auth/google/callback", loginWithGoogle as any);
export default userRoutes;
