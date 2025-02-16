import express from "express";
import userRoutes from "./userRoutes";

const genRoutes=express.Router();

genRoutes.use('/',userRoutes);

export default genRoutes;