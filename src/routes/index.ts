import express from "express";
import userRoutes from "./userRoutes";
import propRoute from "./propertRoutes";
import bookingRoutes from "./bookingRoutes"
const genRoutes=express.Router();

genRoutes.use('/',userRoutes);
genRoutes.use('/',propRoute)
genRoutes.use('/',bookingRoutes)
export default genRoutes;