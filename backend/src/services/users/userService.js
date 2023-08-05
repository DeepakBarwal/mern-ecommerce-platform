import jwt from "jsonwebtoken";
import { CrudRepository } from "../../repository/index.js";
import User from "../../models/User.js";
import { JWT_SECRET } from "../../config/serverConfig.js";

class UserService extends CrudRepository {
  constructor() {
    super(User);
  }

  async getUserByEmail(email) {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      console.error(`Error at User Service layer: ${error}`);
      throw error;
    }
  }

  generateToken(user) {
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    return token;
  }

  async getUserWithoutPassword(id) {
    try {
      const user = await User.findById(id).select("-password");
      return user;
    } catch (error) {
      console.error(`Error at User Service layer: ${error}`);
      throw error;
    }
  }
}

export default UserService;
