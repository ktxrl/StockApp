const express = require('express');
const router = express.Router();
const { getStockData } = require('../services/alphaVantageService');

// Mock user watchlist
let watchlist = ['AAPL', 'GOOGL', 'MSFT'];

// Get user's watchlist
router.get('/', async (req, res) => {
  try {
    const watchlistData = await Promise.all(
      watchlist.map(async (ticker) => {
        const stockData = await getStockData(ticker);
        return { ticker, ...stockData };
      })
    );
    res.json(watchlistData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching watchlist data' });
  }
});

// Add a stock to the watchlist
router.post('/', (req, res) => {
  const { ticker } = req.body;
  if (ticker && !watchlist.includes(ticker)) {
    watchlist.push(ticker);
    res.status(201).json({ message: 'Stock added to watchlist' });
  } else if (watchlist.includes(ticker)) {
    res.status(409).json({ message: 'Stock already in watchlist' });
  } else {
    res.status(400).json({ message: 'Invalid request' });
  }
});

// Remove a stock from the watchlist
router.delete('/:ticker', (req, res) => {
  const { ticker } = req.params;
  const index = watchlist.indexOf(ticker);
  if (index > -1) {
    watchlist.splice(index, 1);
    res.json({ message: 'Stock removed from watchlist' });
  } else {
    res.status(404).json({ message: 'Stock not found in watchlist' });
  }
});

module.exports = router;