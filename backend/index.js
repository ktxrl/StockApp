require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stockRoutes = require('./src/routes/stockRoutes');
const portfolioRoutes = require('./src/routes/portfolioRoutes');
const watchlistRoutes = require('./src/routes/watchlistRoutes');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/stocks', stockRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/watchlist', watchlistRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});