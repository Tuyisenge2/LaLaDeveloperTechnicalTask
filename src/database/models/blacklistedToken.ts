"use strict";
import { DataTypes, Model, Sequelize, UUIDV4 } from "sequelize";
import database_models from "../config/db.config";
import {
  BlacklistedTokenModelAttributes,
  BlacklistedTokenCreationAttributes,
} from "../../types/models";

class BlacklistedToken extends Model<
  BlacklistedTokenModelAttributes,
  BlacklistedTokenCreationAttributes
> {
  public id!: string;
  public token!: string;
  public createdAt!: Date;
  public updatedAt!: Date;

  public static associate() {}
}

const BlacklistedToken_model = (sequelize: Sequelize) => {
  BlacklistedToken.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      token: {
        type: DataTypes.TEXT,
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
      modelName: "blacklisted_tokens",
    }
  );
  return BlacklistedToken;
};

export default BlacklistedToken_model;
