import React, { useState, useEffect } from 'react';

const EditStockForm = ({ stock, onSave, onCancel }) => {
  const [quantity, setQuantity] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');

  useEffect(() => {
    if (stock) {
      setQuantity(stock.quantity);
      setPurchasePrice(stock.price);
    }
  }, [stock]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...stock, quantity: parseInt(quantity), price: parseFloat(purchasePrice) });
  };

  if (!stock) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-bold mb-4">Edit Stock</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="purchasePrice" className="block text-sm font-medium text-gray-700">Purchase Price</label>
            <input
              type="number"
              id="purchasePrice"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onCancel} className="mr-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStockForm;