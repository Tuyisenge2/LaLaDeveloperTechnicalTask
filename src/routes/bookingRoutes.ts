import  express  from "express";
import { getAllBookings,createBooking, updateBookingStatus, deleteBooking, getSingleBooking } from "../controllers/bookingcontroller";
import { isTokenValid ,isPropertyBooked, isBooking} from "../middleware/bookingMiddleware";
import { isUserLoggedIn } from "../middleware/authenticationMiddleware";
const bookingRoute= express.Router();

bookingRoute.get("/bookings",isUserLoggedIn as any,isTokenValid,getAllBookings as any);
bookingRoute.post("/bookings",isUserLoggedIn as any,isTokenValid,isPropertyBooked as any,createBooking as any);
bookingRoute.get("/bookings/:id",isUserLoggedIn as any, isTokenValid,getSingleBooking as any)
bookingRoute.patch("/bookings/:id",isUserLoggedIn as any,isTokenValid,isBooking as any,updateBookingStatus as any)
bookingRoute.delete("/bookings/:id",isUserLoggedIn as any,isTokenValid,isBooking as any,deleteBooking as any)


export default bookingRoute;