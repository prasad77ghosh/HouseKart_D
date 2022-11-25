const express = require("express");
const router = express.Router();
const { isAuthUser, authRoles } = require("../middlewares/auth");
const {processPayment} = require("../controllers/paymentController");
const {sendStrikeApiKey} = require("../controllers/paymentController");

router.route("/payment/process").post(isAuthUser, processPayment);
router.route("/stripeapikey").get(isAuthUser, sendStrikeApiKey);
module.exports = router;
