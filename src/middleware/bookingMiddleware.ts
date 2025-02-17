import { NextFunction, Response } from "express";
import { ExpandedRequest } from "../types/genTypes";
import { validateToken } from "../utils/decodeToken";
import { TOKEN_SECRET } from "../utils/key";
import database_models from "../database/config/db.config";

export const isTokenValid = async (
  req: ExpandedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  const validToken = validateToken(token, TOKEN_SECRET as string);
  req.validUser = validToken.user;
  next();
};
const formatDate = (isoString: any) => {
  const date = new Date(isoString);
  return date.toISOString().split("T")[0];
};

export const isBooking = async (
  req: ExpandedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const booking = await database_models.Booking.findOne({ where: { id } });

    const bookingg:any = await database_models.Booking.findOne({
        where: { id },
        include: [
          {
            model: database_models.Property,
            as: "property", 
            include: [
              {
                model: database_models.User, 
                as: "host", 
                foreignKey: 'hostId', 
              },
            ],
          },
        ],
      });
      if (bookingg?.property)console.log("mustrddddddddddddddddd",bookingg?.property?.host);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    next();
  } catch (error) {
    return res.json({
      status: 500,
      message: "server error occured",
      error,
    });
  }
};

export const isPropertyBooked = async (
  req: ExpandedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { propertyId, checkInDate, checkOutDate } = req.body;
    const existingBooking = await database_models.Booking.findOne({
      where: {
        propertyId,
      },
    });
    if (
      existingBooking &&
      checkInDate >= formatDate(existingBooking.checkInDate) &&
      formatDate(checkInDate <= existingBooking.checkOutDate)
    ) {
      return res.json({
        status: 409,
        message: "the property is already booked , try other later dates",
      });
    }
    next();
  } catch (error) {
    return res.json({
      status: 500,
      message: "server error occured",
      error,
    });
  }
};
