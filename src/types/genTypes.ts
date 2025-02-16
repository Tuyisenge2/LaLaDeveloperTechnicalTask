import { Request } from "express";

export interface ExpandedRequest extends Request {
  token?: any;
  category?: string;
  publisher?: string;
  info?: { message: string };
  imageCloud?: any;
  catId?: string;
}
