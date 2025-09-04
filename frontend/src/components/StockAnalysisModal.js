import React from 'react';

const StockAnalysisModal = ({ stock, onClose }) => {
  if (!stock) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg max-w-2xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{stock.name} ({stock.ticker})</h2>
          <button onClick={onClose} className="text-2xl font-bold">&times;</button>
        </div>
        <div>
          <p><strong>Price:</strong> ${stock.price}</p>
          <p><strong>Change:</strong> {stock.change}%</p>
          <p><strong>AI Score:</strong> {stock.aiScore}</p>
          <p><strong>AI Opinion:</strong> {stock.aiOpinion}</p>
        </div>
      </div>
    </div>
  );
};

export default StockAnalysisModal;