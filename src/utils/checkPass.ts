import bcrypt from "bcrypt";

export const isValidPassword = async (
	password: string,
	currPass: string,
): Promise<boolean> => {
	const isValid = await bcrypt.compareSync(password, currPass);

	return isValid;
};
