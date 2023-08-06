import jwt from "jsonwebtoken";
import { CrudRepository } from "../../repository/index.js";
import User from "../../models/User.js";
import { JWT_SECRET, NODE_ENV } from "../../config/serverConfig.js";

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

  generateTokenAndSetCookie(userId, res) {
    const token = jwt.sign({ userId }, JWT_SECRET, {
      expiresIn: "1h",
    });
    // Set jwt token as http-only cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1h
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
