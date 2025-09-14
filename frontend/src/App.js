import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import StockDetail from './pages/StockDetail';
import Layout from './components/Layout';
import { AppProvider } from './context/AppContext';
import News from './pages/News';
import TransactionHistory from './pages/TransactionHistory';

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/history" element={<TransactionHistory />} />
            <Route path="/news" element={<News />} />
            <Route path="/stock/:ticker" element={<StockDetail />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;
