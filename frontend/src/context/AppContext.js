import React, { createContext, useState, useEffect, useCallback } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [newsSearchTerm, setNewsSearchTerm] = useState('');
  const [newsCategory, setNewsCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const portfolioRes = await fetch('http://localhost:3001/api/stocks/portfolio');
        if (!portfolioRes.ok) throw new Error('Failed to fetch portfolio');
        const portfolioData = await portfolioRes.json();
        setPortfolio(Array.isArray(portfolioData) ? portfolioData : []);

        const recommendationsRes = await fetch('http://localhost:3001/api/recommendations');
        if (!recommendationsRes.ok) throw new Error('Failed to fetch recommendations');
        const recommendationsData = await recommendationsRes.json();
        setRecommendations(Array.isArray(recommendationsData) ? recommendationsData : []);

        const newsRes = await fetch('http://localhost:3001/api/news');
        if (!newsRes.ok) throw new Error('Failed to fetch news');
        const newsData = await newsRes.json();
        setNews(Array.isArray(newsData) ? newsData : []);

        const watchlistRes = await fetch('http://localhost:3001/api/watchlist');
        if (!watchlistRes.ok) throw new Error('Failed to fetch watchlist');
        const watchlistData = await watchlistRes.json();
        setWatchlist(Array.isArray(watchlistData) ? watchlistData : []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchTransactions = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:3001/api/portfolio/history');
      if (!res.ok) throw new Error('Failed to fetch transactions');
      const data = await res.json();
      setTransactions(Array.isArray(data) ? data : []);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  const addStock = async (stock) => {
    try {
      const res = await fetch('http://localhost:3001/api/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stock),
      });
      if (!res.ok) throw new Error('Failed to add stock');
      const newStock = await res.json();
      setPortfolio([...portfolio, newStock]);
    } catch (error) {
      setError(error.message);
    }
  };

  const updateStock = async (id, updatedStock) => {
    try {
      const res = await fetch(`http://localhost:3001/api/portfolio/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedStock),
      });
      if (!res.ok) throw new Error('Failed to update stock');
      const newStock = await res.json();
      setPortfolio(
        portfolio.map((stock) => (stock.id === id ? newStock : stock))
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteStock = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/api/portfolio/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete stock');
      setPortfolio(portfolio.filter((stock) => stock.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const addToWatchlist = async (symbol) => {
    try {
      const res = await fetch('http://localhost:3001/api/watchlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symbol }),
      });
      if (res.status === 409) {
        // Stock is already in the watchlist, no need to do anything
        console.log("Stock already in watchlist");
        return;
      }
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to add to watchlist');
      }
      // Refetch watchlist data after adding a new stock
      const watchlistRes = await fetch('http://localhost:3001/api/watchlist');
      if (!watchlistRes.ok) throw new Error('Failed to fetch watchlist');
      const watchlistData = await watchlistRes.json();
      setWatchlist(Array.isArray(watchlistData) ? watchlistData : []);
    } catch (error) {
      setError(error.message);
    }
  };

  const totalValue = portfolio.reduce((acc, stock) => acc + stock.price * stock.quantity, 10000);
  const dailyPL = 1.2;
  const weeklyPL = -150;

  const filteredNews = news
    .filter(item => newsCategory === 'all' || item.category === newsCategory)
    .filter(item =>
        (item.title && item.title.toLowerCase().includes(newsSearchTerm.toLowerCase())) ||
        (item.insight && item.insight.toLowerCase().includes(newsSearchTerm.toLowerCase()))
    );

    const value = {
        portfolio,
        recommendations,
        news: filteredNews,
        error,
        loading,
        totalValue,
        dailyPL,
        weeklyPL,
        setNewsSearchTerm,
        setNewsCategory,
        searchTerm,
        setSearchTerm,
        addStock,
        updateStock,
        deleteStock,
        transactions,
        fetchTransactions,
        watchlist,
        addToWatchlist,
      };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};