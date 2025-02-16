
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "./key";
interface accessTokenType{
    id:string;
    email:string
}
export const generateToken =(user:accessTokenType)=>{
    const token = jwt.sign(user, TOKEN_SECRET as string, {
		expiresIn: "1y",
	});
	return token;
}
 