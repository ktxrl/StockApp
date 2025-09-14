const express = require('express');
const { getStockData, searchStocks } = require('../services/alphaVantageService');
const { getStockRecommendation, getPortfolio } = require('../services');

const router = express.Router();

router.get('/portfolio', async (req, res) => {
  try {
    const data = await getPortfolio();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/search/:keywords', async (req, res) => {
  try {
    const data = await searchStocks(req.params.keywords);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/recommendation/:ticker', async (req, res) => {
  try {
    const data = await getStockRecommendation(req.params.ticker);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:symbol', async (req, res) => {
  console.log(`Request received for symbol: ${req.params.symbol}`);
  try {
    const data = await getStockData(req.params.symbol);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;