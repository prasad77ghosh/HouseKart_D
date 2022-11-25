const mongoose = require("mongoose");
const validator = require("validator");
const Bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name can't exceed more than 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },

  password: {
    type: String,
    required: [true, "Please enter your password"],
    validate: [
      validator.isStrongPassword,
      "Please enter a strong password it must contains atleast 8-char,1-symbol,1-number,1-uppercase",
    ],
    select: false,
  },

  avatar: {
    public_id: {
      type: String,
      required: true,
    },

    url: {
      type: String,
      required: true,
    },
  },

  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  // when ever we update our profilr make sure my password is not hashed again beacuse we not update password at that time we will do it forgot password
  if (!this.isModified("password")) {
    next();
  }
  this.password = await Bcrypt.hash(this.password, 10);
});

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await Bcrypt.compare(enteredPassword, this.password);
};

//generating password reset token
userSchema.methods.getPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  //hashing and adding to  user schma
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
