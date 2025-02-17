import { DataTypes, Model, Sequelize, UUIDV4 } from "sequelize";
import { UserCreationAttributes, UserModelAttributes } from "../../types/models";
import database_models from "../config/db.config";
const default_date = new Date(Date.now());

export class User extends Model<UserModelAttributes, UserCreationAttributes> {
  public id!: string;
  public userName!: string;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public role!: string;
  public isVerified!: boolean;
  public confirmPassword!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public static associate(models: {
    role: typeof database_models.role;
    Property: typeof database_models.Property;
    Booking: typeof database_models.Booking;
  }) {
    User.belongsTo(models.role, { as: "Roles", foreignKey: "role" });
    this.hasMany(models.Property, {
      as: "properties",
      foreignKey: "hostId",
    });
    this.hasMany(models.Booking,{
        as:"renter",
        foreignKey:"renterId"
    })
  }
}
const user_model = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
      },

      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,

        unique: true,
      },
      password: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        references: {
          model: "roles",
          key: "id",
        },
      },
      confirmPassword: {
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
      hooks: {
        afterCreate: async (record, options) => {
     
        },
      },
      sequelize,
      tableName: "users",
    }
  );

  return User;
};
export default user_model;
