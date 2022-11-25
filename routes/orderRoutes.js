const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const router = express.Router();
const { isAuthUser, authRoles } = require("../middlewares/auth");

router.route("/order/new").post(isAuthUser, newOrder);
router.route("/order/:id").get(isAuthUser, getSingleOrder);
router.route("/orders/me").get(isAuthUser, myOrders);

router.route("/admin/orders").get(isAuthUser, authRoles("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuthUser, authRoles("admin"), updateOrder)
  .delete(isAuthUser, authRoles("admin"), deleteOrder);
module.exports = router;
