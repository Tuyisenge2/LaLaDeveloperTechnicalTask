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
  name?: string;
  price?: number;
  images?: string[];
  publisher?:string;
  province?: string;
  district?: string;
  sector?: string;
  category?: string;
  expiryDate?: Date;
  isAvailable?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  description?:string;
	bathRooms?:number;
	plotSize?:number; 
	furnished?:boolean;
	bedRooms?:number;
	totalFloors?:number;
}
export type propertiescreationAttributes = Optional<
  propertiesModelAttributes,
  "id" | "createdAt" | "updatedAt"
>;
