const axios = require('axios');

const API_KEY = process.env.ALPHAVANTAGE_API_KEY || 'demo'; // Using 'demo' key for now
console.log('Using API Key:', API_KEY); // Add this line to debug
const BASE_URL = 'https://www.alphavantage.co/query';

const getStockData = async (symbol) => {
  try {
    const overviewResponse = await axios.get(BASE_URL, {
      params: {
        function: 'OVERVIEW',
        symbol: symbol,
        apikey: API_KEY,
      },
    });

    const quoteResponse = await axios.get(BASE_URL, {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol: symbol,
        apikey: API_KEY,
      },
    });

    const overview = overviewResponse.data;
    const quote = quoteResponse.data['Global Quote'];

    if (!quote || !overview || Object.keys(quote).length === 0) {
      console.error(`Error fetching data for ${symbol}: Invalid API response`);
      return null;
    }

    return {
      Name: overview['Name'],
      Symbol: overview['Symbol'],
      Description: overview['Description'],
      Exchange: overview['Exchange'],
      Sector: overview['Sector'],
      price: parseFloat(quote['05. price']),
      change: parseFloat(quote['09. change']),
      changePercentage: parseFloat(quote['10. change percent']),
      '52WeekHigh': parseFloat(overview['52WeekHigh']),
      '52WeekLow': parseFloat(overview['52WeekLow']),
      marketCap: overview['MarketCapitalization'],
      peRatio: overview['PERatio'],
    };
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error);
    return null;
  }
};

const searchStocks = async (keywords) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'SYMBOL_SEARCH',
        keywords: keywords,
        apikey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error searching stocks for ${keywords}:`, error);
    return null;
  }
};

module.exports = {
  getStockData,
  searchStocks,
};