require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stockRoutes = require('./src/routes/stockRoutes');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/stocks', stockRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});