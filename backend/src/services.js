const axios = require('axios');

const getStockData = async (symbol) => {
  try {
    // Fetch both quote and company overview data
    const [quoteResponse, overviewResponse] = await Promise.all([
      axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.ALPHAVANTAGE_API_KEY}`),
      axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${process.env.ALPHAVANTAGE_API_KEY}`)
    ]);

    return {
      quote: quoteResponse.data,
      overview: overviewResponse.data
    };
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};

const getStockRecommendation = async (ticker) => {
  // In a real application, you would use a sophisticated AI model to generate recommendations.
  // For this example, we'll return a mock recommendation.
  return {
    ticker,
    recommendation: 'Based on our analysis, we recommend buying this stock.',
    confidence: 0.85
  };
};

const getPortfolio = async () => {
  // In a real application, you would fetch this data from a database.
  // For this example, we'll return mock portfolio data.
  return [
    {
      ticker: 'AAPL',
      price: 172.25,
      quantity: 10,
      costBasis: 150.00,
      pl: 222.50,
      plPercentage: 0.1483,
      change: 1.5
    },
    {
      ticker: 'GOOGL',
      price: 2834.37,
      quantity: 5,
      costBasis: 2800.00,
      pl: 171.85,
      plPercentage: 0.15
    }
  ];
};

const addStockToPortfolio = async (stock) => {
  const searchResult = await searchStocks(stock.ticker);
  if (!searchResult.bestMatches || searchResult.bestMatches.length === 0) {
    throw new Error('Invalid stock ticker');
  }
  // Logic to add a stock to the database will go here
  console.log('Adding stock to portfolio:', stock);
  return { ...stock, id: Date.now() }; // Mock response
};

const updateStockInPortfolio = async (id, stock) => {
  // Logic to update a stock in the database will go here
  console.log(`Updating stock ${id} in portfolio:`, stock);
  return { ...stock, id }; // Mock response
};

const deleteStockFromPortfolio = async (id) => {
  // Logic to delete a stock from the database will go here
  console.log(`Deleting stock ${id} from portfolio`);
  return { id }; // Mock response
};

const getTransactionHistory = async () => {
  // In a real application, you would fetch this from the database
  return [
    { id: 1, ticker: 'AAPL', type: 'buy', quantity: 10, price: 150.00, date: '2023-10-26' },
    { id: 2, ticker: 'GOOGL', type: 'buy', quantity: 5, price: 2800.00, date: '2023-10-25' },
    { id: 3, ticker: 'MSFT', type: 'sell', quantity: 8, price: 330.00, date: '2023-10-24' },
  ];
};

const getWatchlist = async () => {
  // Mock data for now
  return [
    { ticker: 'TSLA', price: 180.01, change: -2.54, changePercentage: -1.39 },
    { ticker: 'NVDA', price: 120.89, change: 3.45, changePercentage: 2.94 },
    { ticker: 'AMD', price: 160.34, change: 1.12, changePercentage: 0.70 },
  ];
};

const addStockToWatchlist = async (stock) => {
  // Logic to add a stock to the watchlist in the database will go here
  console.log('Adding stock to watchlist:', stock);
  return { ...stock }; // Mock response
};

const removeStockFromWatchlist = async (ticker) => {
  // Logic to remove a stock from the watchlist in the database will go here
  console.log(`Removing stock ${ticker} from watchlist`);
  return { ticker }; // Mock response
};

module.exports = {
  getStockData,
  getStockRecommendation,
  getPortfolio,
  addStockToPortfolio,
  updateStockInPortfolio,
  deleteStockFromPortfolio,
  getTransactionHistory,
  getWatchlist,
  addStockToWatchlist,
  removeStockFromWatchlist
};