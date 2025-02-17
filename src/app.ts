import express, { Request, Response } from "express"; 
import session from "express-session"
import cors from "cors";
import genRoutes from "./routes";
const app = express(); 
import passport from "./middleware/passport"
import { SESSION_SECRET,GOOGLE_CLIENT_ID,GOOGLE_SECRET_ID } from "./utils/key";

app.use(cors());
app.use(
	session({
		secret: SESSION_SECRET as string,
		resave: false,
		saveUninitialized: true,
	}),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api',genRoutes);
app.use('/',(req:Request,res:Response)=>{
res.status(200).json({
message:"app is working ok"
})
});




export default app;