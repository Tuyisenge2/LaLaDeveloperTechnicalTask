import { Optional } from "sequelize";

export interface UserModelAttributes {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  role?: string;
  createdAt: Date;
  updatedAt: Date;
}
export type UserCreationAttributes = Optional<
  UserModelAttributes,
  "id" | "role" | "createdAt" | "updatedAt"
>;

export interface RolesModelAttributes {
  id?: string;
  roleName?: string;
  createdAt: Date;
  updatedAt: Date;
}
export type RolescreationAttributes = Optional<
  RolesModelAttributes,
  "id" | "createdAt" | "updatedAt"
>;

export interface propertiesModelAttributes {
  id?: string;
  title?: string;
  price?: number;
  hostId?: string;
  province?: string;
  district?: string;
  sector?: string;
  isAvailable?: string;
  createdAt?: Date;
  updatedAt?: Date;
  description?: string;
  host?: UserCreationAttributes;
  images?:any;
}
export type propertiescreationAttributes = Optional<
  propertiesModelAttributes,
  "id" | "createdAt" | "updatedAt"
>;

export interface BookingsModelAttributes {
  id?: string;
  propertyId: string;
  renterId: string;
  checkInDate: Date;
  checkOutDate: Date;
  status?: "pending" | "confirmed" | "canceled";
  property?:propertiescreationAttributes;
  createdAt?: Date;
  updatedAt?: Date;

}

export type BookingsCreationAttributes = Optional<
  BookingsModelAttributes,
  "id" | "status" | "createdAt" | "updatedAt"
>;

export interface BlacklistedTokenModelAttributes {
  id?: string;
  token: string;
  createdAt?: Date;
  updatedAt?: Date;

}

export type BlacklistedTokenCreationAttributes = Optional<
  BlacklistedTokenModelAttributes,
  "id" |  "createdAt" | "updatedAt"
>;
