import { Sequelize } from "sequelize";
 import user_model from "./user";
// import token_model from "./token";
 import role_model from "./roles";
// import category_model from "./categories";
// import properties_model from "./properties";

const Models = (sequelize: Sequelize) => {
   const User = user_model(sequelize);
  // const Token = token_model(sequelize);
   const role = role_model(sequelize);
  // const Category=category_model(sequelize);
  // const Property =properties_model(sequelize);
  return {
     User,
    // Token,
     role,
    // Category,
    // Property,
  };
};
export default Models;
