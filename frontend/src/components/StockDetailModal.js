import React from 'react';

const StockDetailModal = ({ isOpen, onClose, stock }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">{stock.ticker} - {stock.name}</h2>
        <p><strong>Price:</strong> ${stock.price}</p>
        <p><strong>Change:</strong> {stock.change}</p>
        <p><strong>Market Cap:</strong> {stock.marketCap}</p>
        <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default StockDetailModal;