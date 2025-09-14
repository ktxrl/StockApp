import React, { useState, useEffect } from 'react';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/watchlist')
      .then(res => res.json())
      .then(data => setWatchlist(data))
      .catch(err => console.error(err));
  }, []);

  const handleRemoveFromWatchlist = (symbol) => {
    fetch(`http://localhost:3001/api/watchlist/${symbol}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(data => {
        console.log('Removed from watchlist:', data);
        setWatchlist(watchlist.filter(stock => stock.ticker !== symbol));
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Watchlist</h2>
      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-500">
            <th className="p-2">Ticker</th>
            <th className="p-2">Price</th>
            <th className="p-2">Change</th>
            <th className="p-2">% Change</th>
            <th className="p-2">52wk High</th>
            <th className="p-2">52wk Low</th>
            <th className="p-2">Market Cap</th>
            <th className="p-2">P/E Ratio</th>
          </tr>
        </thead>
        <tbody>
          {watchlist.map((stock) => (
            <tr key={stock.ticker} className="border-b">
              <td className="p-2 font-medium">{stock.ticker}</td>
              <td className="p-2">${stock.price.toFixed(2)}</td>
              <td className={`p-2 ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stock.change.toFixed(2)}
              </td>
              <td className={`p-2 ${stock.changePercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stock.changePercentage.toFixed(2)}%
              </td>
              <td className="p-2">${stock['52WeekHigh'].toFixed(2)}</td>
              <td className="p-2">${stock['52WeekLow'].toFixed(2)}</td>
              <td className="p-2">{stock.marketCap}</td>
              <td className="p-2">{stock.peRatio}</td>
              <td className="p-2">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  onClick={() => handleRemoveFromWatchlist(stock.ticker)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Watchlist;