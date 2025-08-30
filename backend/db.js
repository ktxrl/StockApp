const users = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
];

const portfolio = {
  1: [ // User ID
    { ticker: 'AAPL', shares: 10, costBasis: 1500, marketValue: 1700, gainLoss: 13.33, percentChange: 13.33, aiAlignment: 'Positive' },
    { ticker: 'GOOGL', shares: 5, costBasis: 10000, marketValue: 11000, gainLoss: 10, percentChange: 10, aiAlignment: 'Neutral' },
  ],
};

module.exports = { users, portfolio };