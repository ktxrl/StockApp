const express = require('express');
const {
  addStockToPortfolio,
  updateStockInPortfolio,
  deleteStockFromPortfolio,
  getTransactionHistory
} = require('../services');
const router = express.Router();

// Add a stock to the portfolio
router.post('/', async (req, res) => {
  try {
    const newStock = await addStockToPortfolio(req.body);
    res.status(201).json(newStock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a stock in the portfolio
router.put('/:id', async (req, res) => {
  try {
    const updatedStock = await updateStockInPortfolio(req.params.id, req.body);
    res.json(updatedStock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a stock from the portfolio
router.delete('/:id', async (req, res) => {
  try {
    const deletedStock = await deleteStockFromPortfolio(req.params.id);
    res.json(deletedStock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get transaction history
router.get('/history', async (req, res) => {
  try {
    const history = await getTransactionHistory();
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;