import  express  from "express";
import { createProperty, deleteSingleproperties, editSingleproperties, getAllproperties, getsingleproperties } from "../controllers/propertiesController";
import { checkUserRole, IdValidated, isPropertAvailable, isPublisherExist, propValidation } from "../middleware/propertiesMiddleware";
import { isUserLoggedIn } from "../middleware/authenticationMiddleware";

const propRoute= express.Router();

propRoute.post("/properties",isUserLoggedIn as any,checkUserRole("Hosts") as any,propValidation as any,isPublisherExist as any,createProperty as any);
propRoute.get("/properties",getAllproperties as any)
propRoute.get("/properties/:id",IdValidated('id') as any,getsingleproperties as any)
propRoute.delete("/properties/:id",isUserLoggedIn as any,checkUserRole("Hosts") as any,IdValidated('id') as any,deleteSingleproperties as any)
propRoute.patch("/properties/:id",isUserLoggedIn as any,checkUserRole("Hosts") as any,IdValidated('id') as any,isPropertAvailable('id') as any,editSingleproperties as any)

export default propRoute;