import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";

export const validateToken = (
	token: string | undefined,
	secretKey: string,
)=> {
	try {
		const decodedToken = jwt.verify(token as string, secretKey) as JwtPayload;
		if (decodedToken) return { valid: true, user: decodedToken };
		return { valid: true };
	} catch (error) {
		if (error instanceof JsonWebTokenError) {
			return {
				valid: false,
				reason: "Unauthorized, Invalid Token",
			};
		} else {
			return {
				valid: false,
				reason: "Unexpected error, Please login to continue!",
			};
		}
	}
};