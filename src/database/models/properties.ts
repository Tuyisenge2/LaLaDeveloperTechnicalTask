"use strict";
import { DataTypes, Model, Sequelize, UUIDV4 } from "sequelize";
import database_models from "../config/db.config";
import {
  propertiescreationAttributes,
  propertiesModelAttributes,
} from "../../types/models";

class Properties extends Model<
  propertiesModelAttributes,
  propertiescreationAttributes
> {
  public id!: string;
  public title!: string;
  public price!: number;
  public hostId!: string;
  public province!: string;
  public district!: string;
  public sector!: string;
  public category!: string;
  public isAvailable!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
  public description!: string;
  public static associate(models: {
    User: typeof database_models.User;
    Booking: typeof database_models.Booking;
  }) {
    Properties.belongsTo(models.User, {
      as: "host",
      foreignKey: "hostId",
    });
    Properties.belongsTo(models.Booking,{
      as:"property",
      foreignKey:"propertyId"
    })
   
  }
}
const properties_model = (sequelize: Sequelize) => {
  Properties.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      price: {
        allowNull: true,
        type: DataTypes.BIGINT,
      },
      hostId: {
        allowNull: true,
        type: DataTypes.STRING,
        references: {
          model: "users",
          key: "id",
        },
      },
      province: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      district: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      sector: {
        allowNull: true,
        type: DataTypes.STRING,
      },

      isAvailable: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      description: {
        allowNull: true,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "properties",
    }
  );
  return Properties;
};

export default properties_model;
