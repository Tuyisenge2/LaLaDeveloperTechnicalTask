"use strict";
import { DataTypes, Model, Sequelize, UUIDV4 } from "sequelize";
import {
  RolescreationAttributes,
  RolesModelAttributes,
} from "../../types/models";
import database_models from "../config/db.config";

const default_date = new Date(Date.now());

export class Roles extends Model<RolesModelAttributes, RolescreationAttributes> {
  public id!: string;
  public roleName!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public static associate(models: { User: typeof database_models.User }) {
    Roles.hasMany(models.User, { as: "Roles", foreignKey: "role" });
  }
}
const role_model = (sequelize: Sequelize) => {
  Roles.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
      },
      roleName: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: default_date,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: default_date,
      },
    },
    {
      sequelize,
      modelName: "roles",
    }
  );
  return Roles;
};
export default role_model;
