const express = require("express");

const {
  getAllPortfolios,
  createPortfolio,
  getPortfolioById,
  updatePortfolio,
  deletePortfolio,
} = require("../controllers/portfolioController");

const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authenticate, getAllPortfolios);
router.post("/", authenticate, createPortfolio);
router.get("/:id", getPortfolioById);
router.put("/:id", authenticate, updatePortfolio);
router.delete("/:id", authenticate, deletePortfolio);

module.exports = router;
