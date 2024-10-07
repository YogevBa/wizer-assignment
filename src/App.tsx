import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import EmployeeDetail from './components/EmployeeDetail';
import EmployeeDetailsByUsername from './components/EmployeeDetailByUserName';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <EmployeeList />
        <Routes>
          <Route path="/" element={<EmployeeDetail />} />
          <Route path="/:username" element={<EmployeeDetailsByUsername />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
