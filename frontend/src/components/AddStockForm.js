import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const AddStockForm = () => {
  const [ticker, setTicker] = useState('');
  const [quantity, setQuantity] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');
  const { addStock } = useContext(AppContext);

  const handleTickerChange = (e) => {
    const value = e.target.value;
    setTicker(value);
    if (value) {
      fetch(`http://localhost:3001/api/stocks/search/${value}`)
        .then(res => res.json())
        .then(data => {
          setSearchResults(data.bestMatches || []);
        })
        .catch(err => console.error(err));
    } else {
      setSearchResults([]);
    }
  };

  const handleStockSelect = (symbol) => {
    setTicker(symbol);
    setSearchResults([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!searchResults.find(stock => stock['1. symbol'] === ticker) && searchResults.length > 0) {
        setError('Please select a valid stock from the list.');
        return;
    }

    addStock({ ticker, quantity: parseInt(quantity), price: parseFloat(purchasePrice) });
    setTicker('');
    setQuantity('');
    setPurchasePrice('');
  };

  return (
    <div className="p-4 border-t border-t-[#dbe0e6]">
      <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] pb-2 pt-4">Add New Stock</h3>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-4">
        <div className="flex flex-col gap-2 relative">
          <label htmlFor="ticker" className="text-[#111418] text-sm font-medium leading-normal">Ticker</label>
          <input
            type="text"
            id="ticker"
            value={ticker}
            onChange={handleTickerChange}
            className="rounded-lg border border-[#dbe0e6] p-2"
            required
          />
          {searchResults.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
              <ul className="py-1">
                {searchResults.map(stock => (
                  <li
                    key={stock['1. symbol']}
                    className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleStockSelect(stock['1. symbol'])}
                  >
                    {stock['1. symbol']} - {stock['2. name']}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="quantity" className="text-[#111418] text-sm font-medium leading-normal">Quantity</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="rounded-lg border border-[#dbe0e6] p-2"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="purchasePrice" className="text-[#111418] text-sm font-medium leading-normal">Purchase Price</label>
          <input
            type="number"
            id="purchasePrice"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
            className="rounded-lg border border-[#dbe0e6] p-2"
            required
          />
        </div>
        <div className="flex items-end">
          <button type="submit" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#111418] text-white text-sm font-bold leading-normal tracking-[0.015em]">
            Add Stock
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStockForm;