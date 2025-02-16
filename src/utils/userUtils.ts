import database_models from "../database/config/db.config";
import { UserModelAttributes } from "../types/models";

export const getRoleByName = async (roleName: string) => {
	return await database_models.role.findOne({
		where: { roleName },
	});
};


export const findUserById = async (
	id: string,
): Promise<UserModelAttributes | null> => {
	return await database_models.User.findOne({
		where: { id },
	});
};
