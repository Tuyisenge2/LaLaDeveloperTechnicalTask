import { NextFunction, Response } from "express";
import cloudinary from "./cloudinary";
import { CLOUDINARY_CLOUD_NAME } from "./key";
import { ExpandedRequest } from "../types/genTypes";

export const uploadSingle = async (image: string) => {
  try {
    const result = await cloudinary.uploader.upload(image, {
      CLOUDINARY_CLOUD_NAME,
    });
    return result;
  } catch (error) {
    const err = (error as Error).message;
    return { error: err };
  }
};

export const uploadImages = async (req:ExpandedRequest,res:Response,next:NextFunction) => {
  const imageUrls:any = [];
  const images:any = req.files;
  for(const i in images) {
   try {
       const data:any = await uploadSingle(images[i]?.path);
      if  (data.error) {
					console.log( "Uploading image failed!");		
       return res.status(400).json({
            message:"uploading image failed",
            error:data.error
          })		
			} else {
				imageUrls.push(data?.secure_url);
			}
    } catch (error: any) {
      return res.status(400).json({
        message:"uploading image failed in catch ",
        error:error
      })	
    } 
  }
  req.imageCloud=imageUrls;
  next();
};

