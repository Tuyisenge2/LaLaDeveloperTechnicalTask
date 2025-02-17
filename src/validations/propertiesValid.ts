



import Joi from "joi";
const propertiesValidater = Joi.object({
	title: Joi.string().required(),
	province: Joi.string().required(),
	sector: Joi.string(),
	district: Joi.string().required(),
	isAvailable: Joi.string().required(),
	description: Joi.string().required(),
	price:Joi.number().required(),
	hostId:Joi.string().required()
    
});
export const propValidFun = (user: any) => {
	const {error}=propertiesValidater.validate(user);
	return error;
};
