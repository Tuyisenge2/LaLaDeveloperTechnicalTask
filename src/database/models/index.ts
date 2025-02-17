import { Sequelize } from "sequelize";
import user_model from "./user";
import role_model from "./roles";
import properties_model from "./properties";
import booking_model from "./booking";
import BlacklistedToken_model from "./blacklistedToken";
const Models = (sequelize: Sequelize) => {
  const User = user_model(sequelize);
  const role = role_model(sequelize);
  const Property = properties_model(sequelize);
  const Booking = booking_model(sequelize);
  const blacklistedToken = BlacklistedToken_model(sequelize);
  return {
    User,
    role,
    Property,
    Booking,
    blacklistedToken
  };
};
export default Models;
