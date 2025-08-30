import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [recommendationSearchTerm, setRecommendationSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const portfolioRes = await fetch('http://localhost:5000/api/portfolio');
        if (!portfolioRes.ok) throw new Error('Failed to fetch portfolio');
        const portfolioData = await portfolioRes.json();
        setPortfolio(Array.isArray(portfolioData) ? portfolioData : []);

        const recommendationsRes = await fetch('http://localhost:5000/api/recommendations');
        if (!recommendationsRes.ok) throw new Error('Failed to fetch recommendations');
        const recommendationsData = await recommendationsRes.json();
        setRecommendations(Array.isArray(recommendationsData) ? recommendationsData : []);

        const newsRes = await fetch('http://localhost:5000/api/news');
        if (!newsRes.ok) throw new Error('Failed to fetch news');
        const newsData = await newsRes.json();
        setNews(Array.isArray(newsData) ? newsData : []);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const filteredNews = news.filter(item =>
    (item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.insight && item.insight.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredRecommendations = recommendations.filter(item =>
    (item.company && item.company.toLowerCase().includes(recommendationSearchTerm.toLowerCase())) ||
    (item.ticker && item.ticker.toLowerCase().includes(recommendationSearchTerm.toLowerCase()))
  );

  return (
    <AppContext.Provider value={{ portfolio, recommendations: filteredRecommendations, news: filteredNews, error, setSearchTerm, setRecommendationSearchTerm }}>
      {children}
    </AppContext.Provider>
  );
};