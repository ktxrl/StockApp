import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import AddStockForm from '../components/AddStockForm';
import EditStockForm from '../components/EditStockForm';
import { Link } from 'react-router-dom';

const Portfolio = () => {
  const { portfolio, totalValue, weeklyPL, dailyPL, deleteStock, updateStock } = useContext(AppContext);
  const [editingStock, setEditingStock] = useState(null);

  const handleEdit = (stock) => {
    setEditingStock(stock);
  };

  const handleCancelEdit = () => {
    setEditingStock(null);
  };

  const handleSaveStock = (updatedStock) => {
    updateStock(updatedStock.id, updatedStock);
    setEditingStock(null);
  };

  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight min-w-72">Portfolio</p>
          <Link to="/portfolio/history" className="text-blue-500 hover:underline">View Transaction History</Link>
        </div>
        <div className="flex flex-wrap gap-3 px-4 py-3">
          <div className="flex min-w-[111px] flex-1 basis-[fit-content] flex-col gap-2 rounded-lg border border-[#dbe0e6] p-3 items-start">
            <p className="text-[#111418] tracking-light text-2xl font-bold leading-tight">${totalValue?.toFixed(2)}</p>
            <div className="flex items-center gap-2">
              <p className="text-[#60758a] text-sm font-normal leading-normal">Total Portfolio Value</p>
            </div>
          </div>
          <div className="flex min-w-[111px] flex-1 basis-[fit-content] flex-col gap-2 rounded-lg border border-[#dbe0e6] p-3 items-start">
            <p className="text-[#111418] tracking-light text-2xl font-bold leading-tight">{dailyPL?.toFixed(2)}%</p>
            <div className="flex items-center gap-2">
              <p className="text-[#60758a] text-sm font-normal leading-normal">Daily P&L</p>
            </div>
          </div>
          <div className="flex min-w-[111px] flex-1 basis-[fit-content] flex-col gap-2 rounded-lg border border-[#dbe0e6] p-3 items-start">
            <p className="text-[#111418] tracking-light text-2xl font-bold leading-tight">${weeklyPL?.toFixed(2)}</p>
            <div className="flex items-center gap-2">
              <p className="text-[#60758a] text-sm font-normal leading-normal">Weekly P&L</p>
            </div>
          </div>
          <div className="grid grid-cols-1 @[480px]:grid-cols-2 @[720px]:grid-cols-3 gap-3 w-full">
            <div className="flex flex-col gap-2 p-4 rounded-xl border border-[#dbe0e6] bg-white">
              <p className="text-[#60758a] tracking-light text-sm font-normal leading-normal">Total Value</p>
              <p className="text-[#111418] tracking-light text-2xl font-bold leading-tight">${totalValue?.toFixed(2)}</p>
            </div>
            <div className="flex flex-col gap-2 p-4 rounded-xl border border-[#dbe0e6] bg-white">
              <p className="text-[#60758a] tracking-light text-sm font-normal leading-normal">Daily P&L</p>
              <p className="text-[#111418] tracking-light text-2xl font-bold leading-tight">{dailyPL?.toFixed(2)}%</p>
            </div>
            <div className="flex flex-col gap-2 p-4 rounded-xl border border-[#dbe0e6] bg-white">
              <p className="text-[#60758a] tracking-light text-sm font-normal leading-normal">Weekly P&L</p>
              <p className="text-[#111418] tracking-light text-2xl font-bold leading-tight">${weeklyPL?.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Key Stats</h3>
        <div className="flex flex-wrap gap-4 p-4">
          <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#dbe0e6]">
            <p className="text-[#111418] text-base font-medium leading-normal">Best Performer</p>
            <p className="text-[#111418] tracking-light text-2xl font-bold leading-tight">TechCo +5.2%</p>
          </div>
          <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#dbe0e6]">
            <p className="text-[#111418] text-base font-medium leading-normal">Worst Performer</p>
            <p className="text-[#111418] tracking-light text-2xl font-bold leading-tight">BioCorp -3.1%</p>
          </div>
          <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#dbe0e6]">
            <p className="text-[#111418] text-base font-medium leading-normal">Cash Balance</p>
            <p className="text-[#111418] tracking-light text-2xl font-bold leading-tight">$10,000</p>
          </div>
        </div>
        <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Holdings</h3>
        <div className="px-4 py-3 @container">
          <div className="flex overflow-hidden rounded-xl border border-[#dbe0e6] bg-white">
            <table className="flex-1">
              <thead>
                <tr className="bg-white">
                  <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">Ticker & Company</th>
                  <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">Current Price</th>
                  <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">Shares Held</th>
                  <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">Market Value</th>
                  <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">Avg Buy Price</th>
                  <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">Unrealized P&L</th>
                  <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">Daily % Change</th>
                  <th className="px-4 py-3 text-left text-[#111418] w-60 text-sm font-medium leading-normal">AI Alignment</th>
                  <th className="px-4 py-3 text-left text-[#111418] w-60 text-[#60758a] text-sm font-medium leading-normal">Actions</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.map((stock) => (
                  <tr key={stock.id} className="border-t border-t-[#dbe0e6]">
                    <td className="h-[72px] px-4 py-2 w-[400px] text-[#111418] text-sm font-normal leading-normal">{stock.ticker}</td>
                    <td className="h-[72px] px-4 py-2 w-[400px] text-[#60758a] text-sm font-normal leading-normal">{stock.quantity}</td>
                    <td className="h-[72px] px-4 py-2 w-[400px] text-[#60758a] text-sm font-normal leading-normal">${stock.price?.toFixed(2)}</td>
                    <td className="h-[72px] px-4 py-2 w-[400px] text-[#60758a] text-sm font-normal leading-normal">
                      ${(stock.price * stock.quantity)?.toFixed(2)}
                    </td>
                    <td className="h-[72px] px-4 py-2 w-[400px] text-[#60758a] text-sm font-normal leading-normal">${stock.costBasis?.toFixed(2)}</td>
                    <td className={`h-[72px] px-4 py-2 w-[400px] text-sm font-normal leading-normal ${stock.pl > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      ${stock.pl?.toFixed(2)} ({(stock.plPercentage * 100)?.toFixed(2)}%)
                    </td>
                    <td className={`h-[72px] px-4 py-2 w-[400px] text-sm font-normal leading-normal ${stock.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {stock.change?.toFixed(2)}%
                    </td>
                    <td className="h-[72px] px-4 py-2 w-[400px] text-sm font-normal leading-normal">
                      <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#f0f2f5] text-[#111418] text-sm font-medium leading-normal w-full">
                        <span className="truncate">Aligned</span>
                      </button>
                    </td>
                    <td className="h-[72px] px-4 py-2 w-60 text-[#60758a] text-sm font-bold leading-normal tracking-[0.015em]">
                      <button onClick={() => handleEdit(stock)} className="text-blue-500 hover:underline mr-2">Edit</button>
                      <button onClick={() => deleteStock(stock.id)} className="text-red-500 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <AddStockForm />
        <EditStockForm stock={editingStock} onSave={handleSaveStock} onCancel={handleCancelEdit} />
      </div>
    </div>
  );
};

export default Portfolio;