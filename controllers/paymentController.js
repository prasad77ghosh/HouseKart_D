const catchAsyncError = require("../middlewares/catchAsyncError");
const stripe = require("stripe")(process.env.STRIPE_API_SECRET);

exports.processPayment = catchAsyncError(async (req, res, next) => {
  const mypayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "HouseKart",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: mypayment.client_secret });
});

exports.sendStrikeApiKey = catchAsyncError(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
