const express = require("express");
const {
  getAllProducts,
  getAllProductsRaw,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createUpdateReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/productController");
const { isAuthUser, authRoles } = require("../middlewares/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/raw/products").get(getAllProductsRaw);
router
  .route("/admin/product/new")
  .post(isAuthUser, authRoles("admin"), createProduct);
router
  .route("/admin/product/:id")
  .put(isAuthUser, authRoles("admin"), updateProduct)
  .delete(isAuthUser, authRoles("admin"), deleteProduct);

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthUser, createUpdateReview);
router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthUser, deleteReview);



module.exports = router;
