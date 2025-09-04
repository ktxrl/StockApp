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

const searchStocks = async (keywords) => {
  try {
    const response = await axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${process.env.ALPHAVANTAGE_API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error searching stocks:', error);
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
      plPercentage: 0.0122,
      change: -0.5
    }
  ];
};

module.exports = { getStockData, searchStocks, getStockRecommendation, getPortfolio };