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
        if (stockData) {
          return { ticker, ...stockData };
        }
        return null;
      })
    );
    res.json(watchlistData.filter(Boolean));
  } catch (error) {
    res.status(500).json({ message: 'Error fetching watchlist data' });
  }
});

// Add a stock to the watchlist
router.post('/', (req, res) => {
  const { symbol } = req.body;
  if (symbol && !watchlist.includes(symbol)) {
    watchlist.push(symbol);
    res.status(201).json({ message: 'Stock added to watchlist' });
  } else if (watchlist.includes(symbol)) {
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