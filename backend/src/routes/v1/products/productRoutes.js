import expres from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
} from "../../../controllers/index.js";
import { protect, admin } from "../../../middleware/authMiddleware.js";

const router = expres.Router();

router.route("/").get(getAllProducts).post(protect, admin, createProduct);

router.get("/:id", getProductById);

export default router;
