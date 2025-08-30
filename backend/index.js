require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const axios = require('axios');
const rateLimit = require('express-rate-limit');
const { users, portfolio } = require('./db');

const app = express();
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "img-src": ["'self'", "data:", "images.unsplash.com"],
      },
    },
    crossOriginResourcePolicy: false,
  })
);
const port = 5000;
const apiKey = process.env.FMP_API_KEY;

app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);

// API endpoints
app.get('/api/portfolio', (req, res) => {
  // For now, we'll return the portfolio of the first user
  res.json(portfolio[1]);
});

app.get('/api/news', async (req, res) => {
  try {
    const response = await axios.get(`https://financialmodelingprep.com/api/v3/stock_news?limit=5&apikey=${apiKey}`);
    const news = response.data.map(article => ({
      source: article.source,
      title: article.title,
      sentiment: 'Positive', // Placeholder
      imageUrl: article.image,
      url: article.url, // Add article URL
      insight: 'This is a mock AI insight. The news is positive for the company.' // Mock AI insight
    }));
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/recommendations', async (req, res) => {
  try {
    const response = await axios.get(`https://financialmodelingprep.com/api/v3/rating/NVDA?apikey=${apiKey}`);
    const recommendations = response.data.map(rating => ({
      ticker: rating.symbol,
      recommendation: rating.ratingScore,
      confidence: rating.ratingDetailsDCFScore,
      analysis: 'This is a mock AI analysis. The recommendation is based on strong market performance.' // Mock AI analysis
    }));
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/stock-analysis/:ticker', (req, res) => {
  const { ticker } = req.params;
  // In a real application, you would perform a detailed analysis based on the ticker.
  // For this mock, we'll return a generic analysis.
  res.json({ 
    ticker,
    analysis: `This is a mock AI analysis for ${ticker}. Based on our models, the outlook is positive due to strong market fundamentals and recent positive news.`
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});