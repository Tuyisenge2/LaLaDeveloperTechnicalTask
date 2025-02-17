import { Response } from "express";
import { ExpandedRequest } from "../types/genTypes";
import database_models from "../database/config/db.config";

export const createBooking = async (req: ExpandedRequest, res: Response) => {
  try {
    const { propertyId, checkInDate, checkOutDate } = req.body;
    const booking = await database_models.Booking.create({
      propertyId,
      renterId: req.validUser?.id,
      checkInDate,
      checkOutDate,
      status: "pending",
    });
    return res.status(201).json({
      message: "Booking request created successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

export const getAllBookings = async (req: ExpandedRequest, res: Response) => {
  try {
    const bookings = await database_models.Booking.findAll();
    return res.status(200).json({
      message: "Bookings fetched successfully",
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

export const getSingleBooking = async (req: ExpandedRequest, res: Response) => {
  try {
    const id = req.params.id;
    const booking = await database_models.Booking.findOne({
      where: { id },
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    return res.status(200).json({
      message: "Booking fetched successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

export const updateBookingStatus = async (
  req: ExpandedRequest,
  res: Response
) => {
  try {
    const id = req.params.id;
    const { status ,checkInDate,checkOutDate } = req.body;
    if (status && !["pending", "confirmed", "canceled"].includes(status)) {
      return res.status(400).json({ message: "Invalid booking status" });
    }
    const booking = await database_models.Booking.update(
      { status ,checkInDate,checkOutDate },
      { where: { id } }
    );

    return res.status(200).json({
      message: "Booking status updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

export const deleteBooking = async (req: ExpandedRequest, res: Response) => {
  try {
    const id = req.params.id;
    const booking = await database_models.Booking.destroy({
      where: { id },
    });
    return res.status(200).json({
      message: "Booking deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};
