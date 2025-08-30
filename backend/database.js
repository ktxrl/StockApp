const users = [
  {
    id: 1,
    username: 'testuser',
    password: 'password',
    portfolio: ['AAPL', 'GOOGL'],
  },
];

const portfolios = {
  1: [
    {
      ticker: 'AAPL',
      shares: 10,
      costBasis: 1300,
    },
    {
      ticker: 'GOOGL',
      shares: 5,
      costBasis: 12000,
    },
  ],
};

module.exports = { users, portfolios };