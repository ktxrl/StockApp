import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import AnalysisModal from '../components/AnalysisModal';
import StockDetailModal from '../components/StockDetailModal';

const Dashboard = () => {
  const { recommendations, portfolio, news, setRecommendationSearchTerm } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [analysis, setAnalysis] = useState('');
  const [isStockDetailModalOpen, setIsStockDetailModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);

  const handleOpenModal = (analysis) => {
    setAnalysis(analysis);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setAnalysis('');
  };

  const handleOpenStockDetailModal = (stock) => {
    setSelectedStock(stock);
    setIsStockDetailModalOpen(true);
  };

  const handleCloseStockDetailModal = () => {
    setIsStockDetailModalOpen(false);
    setSelectedStock(null);
  };

  const handleSearch = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const symbol = e.target.value;
      try {
        const response = await axios.get(`http://localhost:5000/api/stocks/${symbol}`);
        const stockData = response.data['Global Quote'];
        const formattedStock = {
          ticker: stockData['01. symbol'],
          name: '', // API doesn't provide name, can be fetched from another endpoint if needed
          price: parseFloat(stockData['05. price']).toFixed(2),
          change: parseFloat(stockData['09. change']).toFixed(2),
          marketCap: 'N/A' // API doesn't provide market cap in this endpoint
        };
        handleOpenStockDetailModal(formattedStock);
      } catch (error) {
        console.error('Error fetching stock data:', error);
        // Handle error, e.g., show a notification to the user
      }
    }
  };


  // Helper function to format numbers with commas
  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  // Calculate portfolio value
  const portfolioValue = portfolio.reduce((acc, stock) => acc + stock.value, 0);
  const dailyPnl = portfolio.reduce((acc, stock) => acc + stock.pnl, 0);
  const weeklyPnl = portfolio.reduce((acc, stock) => acc + stock.pnl, 0); // Assuming weekly is same as daily for now

  return (
    <>
      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <div className="flex flex-wrap justify-between gap-3 p-4"><p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight min-w-72">Dashboard</p></div>
          <div className="flex flex-wrap gap-4 p-4">
            <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-[#f0f2f5]">
              <p className="text-[#111418] text-base font-medium leading-normal">Portfolio Value</p>
              <p className="text-[#111418] tracking-light text-2xl font-bold leading-tight">${formatNumber(portfolioValue.toFixed(2))}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 p-4">
            <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#dbe0e6]">
              <p className="text-[#111418] text-base font-medium leading-normal">Daily PnL</p>
              <p className={`text-2xl font-bold leading-tight ${dailyPnl >= 0 ? 'text-[#078838]' : 'text-[#e73908]'}`}>
                {dailyPnl >= 0 ? '+' : ''}${formatNumber(dailyPnl.toFixed(2))}
              </p>
              <p className={`text-base font-medium leading-normal ${dailyPnl >= 0 ? 'text-[#078838]' : 'text-[#e73908]'}`}>
                {dailyPnl >= 0 ? '+' : ''}1.2%
              </p>
            </div>
            <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#dbe0e6]">
              <p className="text-[#111418] text-base font-medium leading-normal">Weekly PnL</p>
              <p className={`text-2xl font-bold leading-tight ${weeklyPnl >= 0 ? 'text-[#078838]' : 'text-[#e73908]'}`}>
                {weeklyPnl >= 0 ? '+' : ''}${formatNumber(weeklyPnl.toFixed(2))}
              </p>
              <p className={`text-base font-medium leading-normal ${weeklyPnl >= 0 ? 'text-[#078838]' : 'text-[#e73908]'}`}>
                -0.5%
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 p-4">
            <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#dbe0e6]">
              <p className="text-[#111418] text-base font-medium leading-normal">S&amp;P 500</p>
              <p className="text-[#111418] tracking-light text-2xl font-bold leading-tight">4,500</p>
              <p className="text-[#078838] text-base font-medium leading-normal">+0.5%</p>
            </div>
            <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#dbe0e6]">
              <p className="text-[#111418] text-base font-medium leading-normal">Nasdaq</p>
              <p className="text-[#111418] tracking-light text-2xl font-bold leading-tight">14,000</p>
              <p className="text-[#e73908] text-base font-medium leading-normal">-0.2%</p>
            </div>
            <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#dbe0e6]">
              <p className="text-[#111418] text-base font-medium leading-normal">Dow</p>
              <p className="text-[#111418] tracking-light text-2xl font-bold leading-tight">34,000</p>
              <p className="text-[#078838] text-base font-medium leading-normal">+0.1%</p>
            </div>
          </div>
          <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">AI Recommendations</h2>
          <div className="px-4 py-3">
            <label className="flex flex-col min-w-40 h-12 w-full">
              <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                <div
                  className="text-[#60758a] flex border-none bg-[#f0f2f5] items-center justify-center pl-4 rounded-l-xl border-r-0"
                  data-icon="MagnifyingGlass"
                  data-size="24px"
                  data-weight="regular"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path
                      d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
                    ></path>
                  </svg>
                </div>
                <input
                  placeholder="Search for stocks"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f5] focus:border-none h-full placeholder:text-[#60758a] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                  onChange={(e) => setRecommendationSearchTerm(e.target.value)}
                  onKeyDown={handleSearch}
                />
              </div>
            </label>
          </div>
          {recommendations.map((rec, index) => (
            <div className="p-4" key={index}>
              <div className="flex items-stretch justify-between gap-4 rounded-xl bg-white p-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
                <div className="flex flex-[2_2_0px] flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-[#60758a] text-sm font-normal leading-normal">{rec.company}</p>
                    <p className="text-[#111418] text-base font-bold leading-tight">Ticker: {rec.ticker}</p>
                    <p className="text-[#60758a] text-sm font-normal leading-normal">
                      {rec.action} | Expected Return: {rec.expectedReturn} | Confidence: {rec.confidence} | Risk: {rec.risk} | Rationale: {rec.rationale}
                    </p>
                  </div>
                  <button
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 flex-row-reverse bg-[#f0f2f5] text-[#111418] pr-2 gap-1 text-sm font-medium leading-normal w-fit"
                    onClick={() => handleOpenModal(rec.rationale)}
                  >
                    <div className="text-[#111418]" data-icon="CaretRight" data-size="18px" data-weight="regular">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                      </svg>
                    </div>
                    <span className="truncate">View Analysis</span>
                  </button>
                </div>
                <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1" style={{ backgroundImage: `url(${rec.imageUrl})` }}></div>
              </div>
            </div>
          ))}
          <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Portfolio Snapshot</h2>
          <div className="px-4 py-3 @container">
            <div className="flex overflow-hidden rounded-xl border border-[#dbe0e6] bg-white">
              <table className="flex-1">
                <thead>
                  <tr className="bg-white">
                    <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">Ticker</th>
                    <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">
                      Current Price
                    </th>
                    <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">
                      % Change
                    </th>
                    <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">PnL %</th>
                    <th className="px-4 py-3 text-left text-[#111418] w-60 text-sm font-medium leading-normal">AI Alignment</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolio.slice(0, 5).map((stock, index) => (
                    <tr key={index} className="border-t border-t-[#dbe0e6]">
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#111418] text-sm font-normal leading-normal">{stock.ticker}</td>
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#60758a] text-sm font-normal leading-normal">${stock.price.toFixed(2)}</td>
                      <td className={`h-[72px] px-4 py-2 w-[400px] text-sm font-normal leading-normal ${stock.pnl >= 0 ? 'text-[#078838]' : 'text-[#e73908]'}`}>{stock.pnl.toFixed(2)}%</td>
                      <td className={`h-[72px] px-4 py-2 w-[400px] text-sm font-normal leading-normal ${stock.unrealizedPnlPercentage >= 0 ? 'text-[#078838]' : 'text-[#e73908]'}`}>{stock.unrealizedPnlPercentage.toFixed(2)}%</td>
                      <td className="h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button
                          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#f0f2f5] text-[#111418] text-sm font-medium leading-normal w-full"
                        >
                          <span className="truncate">{stock.aiAlignment}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex px-4 py-3 justify-end">
            <Link to="/portfolio">
              <button
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f0f2f5] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">View Full Portfolio</span>
              </button>
            </Link>
          </div>
          <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">News Highlights</h2>
          {news.slice(0, 3).map((newsItem, index) => (
            <div key={index} className="p-4">
              <div className="flex items-stretch justify-between gap-4 rounded-xl bg-white p-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
                <div className="flex flex-col gap-1 flex-[2_2_0px]">
                  <p className="text-[#60758a] text-sm font-normal leading-normal">{newsItem.source} | {newsItem.time}</p>
                  <p className="text-[#111418] text-base font-bold leading-tight">{newsItem.title}</p>
                  <p className="text-[#60758a] text-sm font-normal leading-normal">
                    {newsItem.insight}
                  </p>
                </div>
                <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1" style={{ backgroundImage: `url(${newsItem.imageUrl})` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AnalysisModal isOpen={isModalOpen} onClose={handleCloseModal} analysis={analysis} />
      {selectedStock && <StockDetailModal isOpen={isStockDetailModalOpen} onClose={handleCloseStockDetailModal} stock={selectedStock} />}
    </>
  );
};

export default Dashboard;