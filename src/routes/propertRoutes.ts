import  express  from "express";
import { createProperty, deleteSingleproperties, editSingleproperties, getAllproperties, getsingleproperties } from "../controllers/propertiesController";
import { checkUserRole, IdValidated, imageProvidingmiddleware, isPropertAvailable, isPublisherExist, propValidation } from "../middleware/propertiesMiddleware";
import { isUserLoggedIn } from "../middleware/authenticationMiddleware";
import upload from "../utils/multer";
import { uploadImages } from "../utils/uploadImages";

const propRoute= express.Router();

propRoute.post("/properties",isUserLoggedIn as any,checkUserRole("Hosts") as any,upload.array('images'),imageProvidingmiddleware as any,propValidation as any,isPublisherExist as any,uploadImages as any,createProperty as any);
propRoute.get("/properties",getAllproperties as any)
propRoute.get("/properties/:id",IdValidated('id') as any,getsingleproperties as any)
propRoute.delete("/properties/:id",isUserLoggedIn as any,checkUserRole("Hosts") as any,IdValidated('id') as any,deleteSingleproperties as any)
propRoute.patch("/properties/:id",isUserLoggedIn as any,checkUserRole("Hosts") as any,IdValidated('id') as any,isPropertAvailable('id') as any,editSingleproperties as any)

export default propRoute;