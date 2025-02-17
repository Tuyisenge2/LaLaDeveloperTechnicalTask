import { Response } from "express";
import { ExpandedRequest } from "../types/genTypes";
import database_models from "../database/config/db.config";

export const createProperty = async (req: ExpandedRequest, res: Response) => {
  try {
    const {
      title,
      price,
      province,
      district,
      sector,
      isAvailable,
      description,
    } = req.body;
    const property = await database_models.Property.create({
      title,
      price,
      province,
      district,
      sector,
      isAvailable,
      description,
      hostId: req.hostId,
    });

    return res.status(201).json({
      message: "property created succefully",
      property,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      error,
    });
  }
};

export const getAllproperties = async (req: ExpandedRequest, res: Response) => {
  try {
    const properties = await database_models.Property.findAll();

    // const properties = await database_models.Property.findAll({
    //   include: [{ model: database_models.User, as: "owner" }],
    // });
    console.log(properties)
    return res.status(201).json({
      message: "property created succefully",
      properties,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      error,
    });
  }
};

export const getsingleproperties = async (
  req: ExpandedRequest,
  res: Response
) => {
  try {
    const id = req.params.id;
    const properties = await database_models.Property.findOne({
      where: { id },
    });
    return res.status(200).json({
      message: "property fectched succefully",
      properties,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      error,
    });
  }
};

export const editSingleproperties = async (
  req: ExpandedRequest,
  res: Response
) => {
  try {
    const id = req.params.id;

    const properties = await database_models.Property.update(
      { ...req.body },
      { where: { id } }
    );
    return res.status(200).json({
      message: "property updated succefully",
      properties,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      error,
    });
  }
};

export const deleteSingleproperties = async (
  req: ExpandedRequest,
  res: Response
) => {
  try {
    const id = req.params.id;
    const properties = await database_models.Property.destroy({
      where: { id },
    });
    return res.status(200).json({
      message: "property deleted succefully",
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      error,
    });
  }
};
