const puppeteer = require("puppeteer");
const Portfolio = require("../models/portfolioModel");

const captureAndSaveScreenshot = async (url, portfolioId) => {
  console.log(url);
  console.log(portfolioId);
  try {
    const browser = await puppeteer.launch({
      executablePath:
        "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe", // Update this path if needed
    });
    const page = await browser.newPage();
    await page.goto(url);
    const screenshot = await page.screenshot({ type: "jpeg" });
    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      portfolioId,
      { img: URL.createObjectURL(screenshot) },
      { new: true }
    );
    console.log("updatedPortfolio", updatedPortfolio);
    await browser.close();
    return updatedPortfolio;
  } catch (error) {
    console.log(error);
  }
};

module.exports = captureAndSaveScreenshot;
