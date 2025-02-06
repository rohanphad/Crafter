const mongoose = require("mongoose");

const portfolioSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, default: "Untitled" },
    description: { type: String },
    img: { type: String },
    theme: { type: Object },
    sections: { type: [Object] },
    lastUpdatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamp: true,
  }
);

portfolioSchema.pre("save", function (next) {
  this.lastUpdatedAt = Date.now();
  next();
});

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;
