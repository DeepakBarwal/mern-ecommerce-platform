import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import { UserService } from "../services/index.js";
import { JWT_SECRET } from "../config/serverConfig.js";

const userService = new UserService();

// Protect Routes
export const protect = asyncHandler(async (req, res, next) => {
  // Read the jwt from cookie
  let token = req.cookies?.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = await userService.getUserWithoutPassword(decoded.userId);
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not Authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized, no token");
  }
});

// Admin middleware
export const admin = (req, res, next) => {
  if (req?.user?.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized as admin");
  }
};
