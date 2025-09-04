import React, { createContext, useState, useEffect } from 'react';

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
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};