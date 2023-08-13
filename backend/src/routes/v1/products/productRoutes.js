import expres from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} from "../../../controllers/index.js";
import { protect, admin } from "../../../middleware/authMiddleware.js";

const router = expres.Router();

router.route("/").get(getAllProducts).post(protect, admin, createProduct);
router.get("/top", getTopProducts);

router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

router.post("/:id/reviews", protect, createProductReview);

export default router;
