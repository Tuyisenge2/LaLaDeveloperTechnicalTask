"use strict";
import { DataTypes, Model, Sequelize, UUIDV4 } from "sequelize";
import database_models from "../config/db.config";
import {
  BookingsModelAttributes,
  BookingsCreationAttributes,
} from "../../types/models";

class Bookings extends Model<
  BookingsModelAttributes,
  BookingsCreationAttributes
> {
  public id!: string;
  public propertyId!: string;
  public renterId!: string;
  public checkInDate!: Date;
  public checkOutDate!: Date;
  public status!: "pending" | "confirmed" | "canceled";
  public createdAt!: Date;
  public updatedAt!: Date;

  public static associate(models: {
    User: typeof database_models.User;
    Property: typeof database_models.Property;
  }) {
    Bookings.belongsTo(models.User, {
      as: "renter",
      foreignKey: "renterId",
    });
    Bookings.belongsTo(models.Property, {
      as: "property",
      foreignKey: "propertyId",
    });
  }
}

const bookings_model = (sequelize: Sequelize) => {
  Bookings.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      propertyId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "properties",
          key: "id",
        },
      },
      renterId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      checkInDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      checkOutDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "confirmed", "canceled"),
        defaultValue: "pending",
        allowNull: false,
      },
      createdAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "bookings",
    }
  );
  return Bookings;
};

export default bookings_model;
