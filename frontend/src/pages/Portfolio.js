import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import StockAnalysisModal from '../components/StockAnalysisModal';

const Portfolio = () => {
  const { portfolio } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [analysis, setAnalysis] = useState('');

  const handleOpenModal = (rationale) => {
    setAnalysis(rationale);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setAnalysis('');
  };

  // Calculate portfolio totals
  const totalPortfolioValue = portfolio.reduce((acc, stock) => acc + stock.value, 0);
  const dailyPnl = portfolio.reduce((acc, stock) => acc + stock.pnl, 0);
  const weeklyPnl = portfolio.reduce((acc, stock) => acc + stock.pnl, 0); // Placeholder

  // Find best and worst performers
  const bestPerformer = portfolio.reduce((best, stock) => (stock.pnl > best.pnl ? stock : best), portfolio[0]);
  const worstPerformer = portfolio.reduce((worst, stock) => (stock.pnl < worst.pnl ? stock : worst), portfolio[0]);

  return (
    <>
      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <div className="flex flex-wrap justify-between gap-3 p-4"><p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight min-w-72">Portfolio</p></div>
          <div className="flex flex-wrap gap-3 px-4 py-3">
            <div className="flex min-w-[111px] flex-1 basis-[fit-content] flex-col gap-2 rounded-lg border border-[#dbe0e6] p-3 items-start">
              <p className="text-[#111418] tracking-light text-2xl font-bold leading-tight">${totalPortfolioValue.toLocaleString()}</p>
              <div className="flex items-center gap-2"><p className="text-[#60758a] text-sm font-normal leading-normal">Total Portfolio Value</p></div>
            </div>
            <div className="flex min-w-[111px] flex-1 basis-[fit-content] flex-col gap-2 rounded-lg border border-[#dbe0e6] p-3 items-start">
              <p className={`text-2xl font-bold leading-tight ${dailyPnl >= 0 ? 'text-[#078838]' : 'text-[#e73908]'}`}>
                {dailyPnl >= 0 ? '+' : ''}{dailyPnl.toFixed(2)}%
              </p>
              <div className="flex items-center gap-2"><p className="text-[#60758a] text-sm font-normal leading-normal">Daily P&amp;L</p></div>
            </div>
            <div className="flex min-w-[111px] flex-1 basis-[fit-content] flex-col gap-2 rounded-lg border border-[#dbe0e6] p-3 items-start">
              <p className={`text-2xl font-bold leading-tight ${weeklyPnl >= 0 ? 'text-[#078838]' : 'text-[#e73908]'}`}>
                {weeklyPnl >= 0 ? '+' : ''}${weeklyPnl.toLocaleString()}
              </p>
              <div className="flex items-center gap-2"><p className="text-[#60758a] text-sm font-normal leading-normal">Weekly P&amp;L</p></div>
            </div>
          </div>
          <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Key Stats</h3>
          <div className="flex flex-wrap gap-4 p-4">
            <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#dbe0e6]">
              <p className="text-[#111418] text-base font-medium leading-normal">Best Performer</p>
              <p className="text-[#111418] tracking-light text-2xl font-bold leading-tight">{bestPerformer?.ticker} +{bestPerformer?.pnl.toFixed(2)}%</p>
            </div>
            <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#dbe0e6]">
              <p className="text-[#111418] text-base font-medium leading-normal">Worst Performer</p>
              <p className="text-[#111418] tracking-light text-2xl font-bold leading-tight">{worstPerformer?.ticker} {worstPerformer?.pnl.toFixed(2)}%</p>
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
                    <th className="px-4 py-3 text-left text-[#111418] w-[200px] text-sm font-medium leading-normal">Ticker &amp; Company</th>
                    <th className="px-4 py-3 text-left text-[#111418] w-[150px] text-sm font-medium leading-normal">Current Price</th>
                    <th className="px-4 py-3 text-left text-[#111418] w-[100px] text-sm font-medium leading-normal">Shares Held</th>
                    <th className="px-4 py-3 text-left text-[#111418] w-[150px] text-sm font-medium leading-normal">Market Value</th>
                    <th className="px-4 py-3 text-left text-[#111418] w-[150px] text-sm font-medium leading-normal">Avg Buy Price</th>
                    <th className="px-4 py-3 text-left text-[#111418] w-[150px] text-sm font-medium leading-normal">Unrealized P&amp;L</th>
                    <th className="px-4 py-3 text-left text-[#111418] w-[150px] text-sm font-medium leading-normal">Daily % Change</th>
                    <th className="px-4 py-3 text-left text-[#111418] w-[150px] text-sm font-medium leading-normal">AI Alignment</th>
                    <th className="px-4 py-3 text-left text-[#111418] w-[120px] text-sm font-medium leading-normal">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolio.map((stock, index) => (
                    <tr key={index} className="border-t border-t-[#dbe0e6]">
                      <td className="h-[72px] px-4 py-2 w-[200px] text-[#111418] text-sm font-normal leading-normal">{stock.ticker}</td>
                      <td className="h-[72px] px-4 py-2 w-[150px] text-[#60758a] text-sm font-normal leading-normal">${stock.price.toFixed(2)}</td>
                      <td className="h-[72px] px-4 py-2 w-[100px] text-[#60758a] text-sm font-normal leading-normal">{stock.shares}</td>
                      <td className="h-[72px] px-4 py-2 w-[150px] text-[#60758a] text-sm font-normal leading-normal">${stock.value.toLocaleString()}</td>
                      <td className="h-[72px] px-4 py-2 w-[150px] text-[#60758a] text-sm font-normal leading-normal">${stock.avgBuyPrice.toFixed(2)}</td>
                      <td className={`h-[72px] px-4 py-2 w-[150px] text-sm font-normal leading-normal ${stock.unrealizedPnl >= 0 ? 'text-[#078838]' : 'text-[#e73908]'}`}>
                        {stock.unrealizedPnl.toFixed(2)} ({stock.unrealizedPnlPercentage.toFixed(2)}%)
                      </td>
                      <td className={`h-[72px] px-4 py-2 w-[150px] text-sm font-normal leading-normal ${stock.pnl >= 0 ? 'text-[#078838]' : 'text-[#e73908]'}`}>{stock.pnl.toFixed(2)}%</td>
                      <td className="h-[72px] px-4 py-2 w-[150px] text-sm font-normal leading-normal">
                        <button
                          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#f0f2f5] text-[#111418] text-sm font-medium leading-normal w-full"
                          onClick={() => handleOpenModal(stock.aiAlignment)}
                        >
                          <span className="truncate">{stock.aiAlignment}</span>
                        </button>
                      </td>
                      <td className="h-[72px] px-4 py-2 w-[120px] text-[#60758a] text-sm font-bold leading-normal tracking-[0.015em]">
                        <button
                          className="text-sm font-bold leading-normal tracking-[0.015em] text-[#007bff]"
                          onClick={() => handleOpenModal(stock.aiAlignment)}
                        >
                          More Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <StockAnalysisModal isOpen={isModalOpen} onClose={handleCloseModal} analysis={analysis} />
    </>
  );
};

export default Portfolio;