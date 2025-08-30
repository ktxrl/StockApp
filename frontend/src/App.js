import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import News from './pages/News';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import { AppContext } from './context/AppContext';

function App() {
  const { error } = useContext(AppContext);

  return (
    <Router>
      <Layout>
        {error && <div className="p-4 text-red-500">Error: {error}</div>}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/news" element={<News />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
