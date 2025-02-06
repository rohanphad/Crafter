const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    googleId: { type: String, unique: true, sparse: true },
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    },
    pic: {
      type: String,

      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamp: true,
  }
);

userSchema.methods.verifyPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateAuthToken = function () {
  console.log("generateAuthToken called");
  const payload = { id: this._id };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};

userSchema.pre("save", async function (next) {
  console.log("pre save called");
  console.log(this);
  if (!this.isModified || this.googleId) {
    console.log("isModified or googleId");
    next();
  } else {
    try {
      const salt = await bcrypt.genSalt(10);
      console.log("this.password ", this.password);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
