import { Request } from "express";
import { Multer } from 'multer'; 
export interface ExpandedRequest extends Request {
  token?: any;
  category?: string;
  hostId?: string;
  info?: { message: string };
  validUser?:any;
  property?:any;
  files?: Express.Multer.File[];
  imageCloud?: any;

}
