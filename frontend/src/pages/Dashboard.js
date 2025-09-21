import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import StockAnalysisModal from '../components/StockAnalysisModal';

const Dashboard = () => {
  const { portfolio, recommendations, searchTerm, setSearchTerm, watchlist, setWatchlist } = useContext(AppContext);
  const navigate = useNavigate();
  const [selectedStock, setSelectedStock] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [stockData, setStockData] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(inputValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(inputValue);
    }, 500); // 500ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetch(`http://localhost:3001/api/stocks/search/${debouncedSearchTerm}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setSearchResults(data.bestMatches || []);
        })
        .catch((err) => console.error(err));
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (searchTerm) {
      fetch(`http://localhost:3001/api/stocks/recommendation/${searchTerm}`)
        .then(res => res.json())
        .then(data => setRecommendation(data))
        .catch(err => console.error(err));

      fetch(`http://localhost:3001/api/stocks/${searchTerm}`)
        .then(res => res.json())
        .then(data => setStockData(data))
        .catch(err => console.error(err));
    }
  }, [searchTerm]);

  const portfolioValue = portfolio.reduce((acc, stock) => acc + stock.price * stock.quantity, 0);
  const dailyPnl = portfolio.reduce((acc, stock) => acc + stock.pnl, 0);
  const weeklyPnl = portfolio.reduce((acc, stock) => acc + stock.pnl * 5, 0); // Mock weekly PnL

  const handleSearch = (e) => {
    setInputValue(e.target.value);
  };

  const handleStockSelect = (symbol) => {
    setSearchTerm(symbol);
    setInputValue(symbol);
    setSearchResults([]);
  };

  const handleAddToWatchlist = (symbol) => {
    fetch('http://localhost:3001/api/watchlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ symbol }),
    })
      .then(res => res.json())
      .then(data => {
        console.log('Added to watchlist:', data);
        setWatchlist([...watchlist, data]);
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4"><p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight min-w-72">Dashboard</p></div>
        <div className="flex flex-wrap gap-4 p-4">
          <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-[#f0f2f5]">
            <p className="text-[#111418] text-base font-medium leading-normal">Portfolio Value</p>
            <p className="text-[#111418] tracking-light text-2xl font-bold leading-tight">${portfolioValue?.toFixed(2)}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 p-4">
          <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#dbe0e6]">
            <p className="text-[#111418] text-base font-medium leading-normal">Daily PnL</p>
            <p className="text-[#111418] tracking-light text-2xl font-bold leading-tight">${dailyPnl?.toFixed(2)}</p>
            <p className="text-[#078838] text-base font-medium leading-normal">+1.2%</p>
          </div>
          <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#dbe0e6]">
            <p className="text-[#111418] text-base font-medium leading-normal">Weekly PnL</p>
            <p className="text-[#111418] tracking-light text-2xl font-bold leading-tight">${weeklyPnl?.toFixed(2)}</p>
            <p className="text-[#e73908] text-base font-medium leading-normal">-0.5%</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 p-4">
          <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#dbe0e6]">
            <p className="text-[#111418] text-base font-medium leading-normal">S&P 500</p>
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
        <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Search for stocks</h2>
        <div className="px-4 py-3 relative">
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
                onChange={handleSearch}
                value={inputValue}
              />
            </div>
          </label>
          {searchResults.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg">
              <ul className="py-1">
                {searchResults.map((stock) => (
                  <li
                    key={stock["1. symbol"]}
                    className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleStockSelect(stock["1. symbol"])}
                  >
                    {stock["1. symbol"]} - {stock["2. name"]}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="p-4">
          <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Your Watchlist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {watchlist.map((stock) => (
              <div key={stock.symbol} className="rounded-xl bg-white p-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
                <h3 className="text-lg font-bold">{stock.symbol}</h3>
                <p className="text-2xl font-bold">${stock.price}</p>
              </div>
            ))}
          </div>
        </div>
        <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Stock Details</h2>
        {stockData && stockData.quote && stockData.quote["Global Quote"] && (
        <div className="p-4">
          <div className="rounded-xl bg-white p-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
            <h3 className="text-lg font-bold">{stockData.overview.Name} ({stockData.overview.Symbol})</h3>
            <p className="text-sm text-gray-500">{stockData.overview.Exchange} - {stockData.overview.Sector}</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Price</p>
                <p className="text-2xl font-bold">${parseFloat(stockData.quote["Global Quote"]["05. price"]).toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Change</p>
                <p className={`text-2xl font-bold ${parseFloat(stockData.quote["Global Quote"]["09. change"]) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {parseFloat(stockData.quote["Global Quote"]["09. change"]).toFixed(2)} ({parseFloat(stockData.quote["Global Quote"]["10. change percent"]).toFixed(2)}%)
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">52 Week High</p>
                <p>{stockData.overview["52WeekHigh"]}</p>
              </div>
              <div>
                <p className="text-sm font-medium">52 Week Low</p>
                <p>{stockData.overview["52WeekLow"]}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Market Cap</p>
                <p>{stockData.overview.MarketCapitalization}</p>
              </div>
              <div>
                <p className="text-sm font-medium">P/E Ratio</p>
                <p>{stockData.overview.PERatio}</p>
              </div>
            </div>
            <p className="mt-4 text-sm">{stockData.overview.Description}</p>
            <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 mt-4 bg-[#f0f2f5] text-[#111418] text-sm font-medium leading-normal w-fit"
              onClick={() => handleAddToWatchlist(stockData.overview.Symbol)}
            >
              <span className="truncate">Add to Watchlist</span>
            </button>
          </div>
        </div>
        )}
        {recommendation && (
          <div className="p-4">
            <div className="flex items-stretch justify-between gap-4 rounded-xl bg-white p-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
              <div className="flex flex-[2_2_0px] flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-[#111418] text-base font-bold leading-tight">Ticker: {recommendation.ticker}</p>
                  <p className="text-[#60758a] text-sm font-normal leading-normal">
                    {recommendation.recommendation} | Confidence: {recommendation.confidence}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        {recommendations.map((rec) => (
          <div className="p-4" key={rec.ticker}>
            <div className="flex items-stretch justify-between gap-4 rounded-xl bg-white p-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
              <div className="flex flex-[2_2_0px] flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-[#60758a] text-sm font-normal leading-normal">{rec.name}</p>
                  <p className="text-[#111418] text-base font-bold leading-tight">Ticker: {rec.ticker}</p>
                  <p className="text-[#60758a] text-sm font-normal leading-normal">
                    {rec.recommendation} | Expected Return: {rec.expectedReturn} | Confidence: {rec.confidence} | Risk: {rec.risk} | Rationale: {rec.rationale}
                  </p>
                </div>
                <button
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 flex-row-reverse bg-[#f0f2f5] text-[#111418] pr-2 gap-1 text-sm font-medium leading-normal w-fit"
                  onClick={() => setSelectedStock(rec)}>
                  <div className="text-[#111418]" data-icon="CaretRight" data-size="18px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                    </svg>
                  </div>
                  <span className="truncate">Add to Watchlist</span>
                </button>
              </div>
              <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1" style={{backgroundImage: `url(${rec.image})`}}></div>
              <img alt="" className="invisible absolute size-0" />
            </div>
          </div>
        ))}
        {selectedStock && <StockAnalysisModal stock={selectedStock} onClose={() => setSelectedStock(null)} />}
        <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Portfolio Snapshot</h2>
        <div className="px-4 py-3 @container">
          <div className="flex overflow-hidden rounded-xl border border-[#dbe0e6] bg-white">
            <table className="flex-1">
              <thead>
                <tr className="bg-white">
                  <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">Ticker</th>
                  <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">Current Price</th>
                  <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">% Change</th>
                  <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">PnL %</th>
                  <th className="px-4 py-3 text-left text-[#111418] w-60 text-sm font-medium leading-normal">AI Alignment</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.map((stock) => (
                  <tr key={stock.id} className="border-t border-t-[#dbe0e6]">
                    <td className="h-[72px] px-4 py-2 w-[400px] text-[#111418] text-sm font-normal leading-normal">{stock.ticker}</td>
                    <td className="h-[72px] px-4 py-2 w-[400px] text-[#60758a] text-sm font-normal leading-normal">${stock.price?.toFixed(2)}</td>
                    <td className="h-[72px] px-4 py-2 w-[400px] text-[#60758a] text-sm font-normal leading-normal">{stock.change?.toFixed(2)}%</td>
                    <td className="h-[72px] px-4 py-2 w-[400px] text-[#60758a] text-sm font-normal leading-normal">{(stock.plPercentage * 100)?.toFixed(2)}%</td>
                    <td className="h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                      <button
                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#f0f2f5] text-[#111418] text-sm font-medium leading-normal w-full"
                      >
                        <span className="truncate">✅</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex px-4 py-3 justify-end">
          <button
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f0f2f5] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em]"
            onClick={() => navigate('/portfolio')}
          >
            <span className="truncate">View Full Portfolio</span>
          </button>
        </div>
        <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">News Highlights</h2>
        <div className="p-4">
          <div className="flex items-stretch justify-between gap-4 rounded-xl bg-white p-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
            <div className="flex flex-col gap-1 flex-[2_2_0px]">
              <p className="text-[#60758a] text-sm font-normal leading-normal">Financial Times | 2h ago</p>
              <p className="text-[#111418] text-base font-bold leading-tight">Market Update: Tech Stocks Surge</p>
              <p className="text-[#60758a] text-sm font-normal leading-normal">
                Tech stocks experienced a significant surge today, driven by positive earnings reports and renewed investor confidence. Analysts predict continued growth in the
                sector.
              </p>
            </div>
            <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1" style={{backgroundImage: 'url("undefined")'}}></div>
            <img alt="" className="invisible absolute size-0" />
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-stretch justify-between gap-4 rounded-xl bg-white p-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
            <div className="flex flex-col gap-1 flex-[2_2_0px]">
              <p className="text-[#60758a] text-sm font-normal leading-normal">Business Insider | 4h ago</p>
              <p className="text-[#111418] text-base font-bold leading-tight">Company XYZ Announces New Product</p>
              <p className="text-[#60758a] text-sm font-normal leading-normal">
                XYZ Corporation unveiled its latest product today, a groundbreaking innovation in the industry. The announcement has generated considerable buzz and is expected
                to boost the company's stock.
              </p>
            </div>
            <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1" style={{backgroundImage: 'url("undefined")'}}></div>
            <img alt="" className="invisible absolute size-0" />
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-stretch justify-between gap-4 rounded-xl bg-white p-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
            <div className="flex flex-col gap-1 flex-[2_2_0px]">
              <p className="text-[#60758a] text-sm font-normal leading-normal">Wall Street Journal | 6h ago</p>
              <p className="text-[#111418] text-base font-bold leading-tight">Global Economic Outlook</p>
              <p className="text-[#60758a] text-sm font-normal leading-normal">
                The global economy shows signs of recovery, with several countries reporting improved economic indicators. However, challenges remain, and experts advise
                caution.
              </p>
            </div>
            <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1" style={{backgroundImage: 'url("undefined")'}}></div>
            <img alt="" className="invisible absolute size-0" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;