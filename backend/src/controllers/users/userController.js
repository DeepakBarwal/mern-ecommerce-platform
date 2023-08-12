import { UserService } from "../../services/index.js";
import asyncHandler from "../../middleware/asyncHandler.js";

const userService = new UserService();

// @desc    Auth user & get token
// @route   POST /users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.getUserByEmail(email.toLowerCase());
  if (user && (await user.matchPassword(password))) {
    userService.generateTokenAndSetCookie(user._id, res);

    return res.status(200).json({
      status: "success",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register user
// @route   POST /users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await userService.getUserByEmail(email.toLowerCase());

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await userService.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      status: "success",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } else {
    throw new Error("Invalid user data");
  }
});

// @desc    Logout user / clear cookie
// @route   POST /users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
});

// @desc    Get user profile
// @route   GET /users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await userService.get(req.user._id);
  if (user) {
    return res.status(200).json({
      status: "success",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const updatedUser = await userService.updateUserProfile(
    req.user?._id,
    req.body
  );
  if (!updatedUser) {
    res.status(404);
    throw new Error("No user found");
  }
  res.status(200).json({
    status: "success",
    data: {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    },
  });
});

// @desc    Get users
// @route   GET /users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await userService.getAll();
  res.status(200).json({
    status: "success",
    data: users,
  });
});

// @desc    Get user by id
// @route   GET /users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.getUserWithoutPassword(req.params.id);
  if (user) {
    res.status(200).json({
      status: "success",
      data: user,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Delete users
// @route   DELETE /users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await userService.getUserWithoutPassword(req.params.id);
  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Cannot delete admin");
    }
    await userService.delete(req.params.id);
    res.status(200).json({
      status: "success",
      data: null,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update users
// @route   PUT /users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await userService.getUserWithoutPassword(req.params.id);
  if (user) {
    const updatedUser = await userService.update(req.params.id, {
      name: req.body.name || user.name,
      email: req.body.email || user.email,
      isAdmin: Boolean(req.body.isAdmin),
    });
    res.status(200).json({
      status: "success",
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      },
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
