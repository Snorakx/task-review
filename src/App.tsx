import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TruckManagementPage from './pages/TruckManagment/TruckManagementPage';
import './App.scss';

const App: React.FC = () => {
  return (
    <div className="container">
      <Router >
        <Routes>
          <Route path="/" element={<TruckManagementPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;