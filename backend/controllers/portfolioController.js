const Portfolio = require("../models/portfolioModel");

const getAllPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find({ user: req.user.id });
    res.status(200).json(portfolios);
  } catch (error) {
    res.status(500).json({ message: "Couldn't fetch portfolios" });
  }
};

const getPortfolioById = async (req, res) => {
  try {
    console.log(req.get("origin"));
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    res.status(200).json(portfolio);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong! Couldn't find Portfolio" });
  }
};

const createPortfolio = async (req, res) => {
  const { name, description, theme, sections, img } = req.body;
  try {
    const newPortfolio = new Portfolio({
      user: req.user.id,
      name,
      description,
      theme,
      sections,
      img,
    });
    const savedPortfolio = await newPortfolio.save();

    res.status(201).json(savedPortfolio);
  } catch (error) {
    res.status(500).json({ message: "Couldn't create portfolio" });
  }
};

const updatePortfolio = async (req, res) => {
  try {
    console.log(req.params.id);
    console.log(req.user.id);
    const portfolio = await Portfolio.findById(req.params.id);
    console.log(portfolio);
    if (!portfolio || portfolio.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedPortfolio);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong! Couldn't update portfolio" });
  }
};

const deletePortfolio = async (req, res) => {
  console.log(req.params);
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    console.log(portfolio);

    if (!portfolio || portfolio.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    await Portfolio.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Portfolio deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong! couldn't delete portfolio" });
  }
};

module.exports = {
  getAllPortfolios,
  createPortfolio,
  getPortfolioById,
  updatePortfolio,
  deletePortfolio,
};
