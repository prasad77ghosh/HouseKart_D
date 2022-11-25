const express = require("express");
const {
  Register,
  loginUser,
  logOutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getUserDetailsAdmin,
  updateUserRole,
  deleteUser,
  sendMessage,
} = require("../controllers/userController");

const { isAuthUser, authRoles } = require("../middlewares/auth");

const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logOutUser);
router.route("/me").get(isAuthUser, getUserDetails);
router.route("/password/update").put(isAuthUser, updatePassword);
router.route("/me/update").put(isAuthUser, updateProfile);
router.route("/admin/users").get(isAuthUser, authRoles("admin"), getAllUsers);
router
  .route("/admin/user/:id")
  .get(isAuthUser, authRoles("admin"), getUserDetailsAdmin)
  .put(isAuthUser, authRoles("admin"), updateUserRole)
  .delete(isAuthUser, authRoles("admin"), deleteUser);

router.route("/admin/contact").post(sendMessage);

module.exports = router;
