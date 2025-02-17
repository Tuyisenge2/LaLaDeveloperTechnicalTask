import { Request } from "express";

export interface ExpandedRequest extends Request {
  token?: any;
  category?: string;
  hostId?: string;
  info?: { message: string };
  validUser?:any;
  property?:any;
}
