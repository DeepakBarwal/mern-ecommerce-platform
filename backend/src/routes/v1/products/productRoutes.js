import expres from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
} from "../../../controllers/index.js";
import { protect, admin } from "../../../middleware/authMiddleware.js";

const router = expres.Router();

router.route("/").get(getAllProducts).post(protect, admin, createProduct);

router.route("/:id").get(getProductById).put(protect, admin, updateProduct);

export default router;
