import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/Auth/AuthPage';
import CalendarPage from './pages/Calendar/CalendarPage';
import GroupPage from './pages/Group/GroupPage';

import './App.css';
import './pages/Calendar/UI/CalendarView.css';
import './pages/Calendar/CalendarPage.css';
import './pages/Calendar/Events/EventList.css';
import './pages/Auth/UI/AuthForm.css';
import './pages/Auth/AuthPage.jsx.css'
import './pages/Group/GroupPage.css';
import './pages/Group/UI/GroupCard.css';
import './pages/Group/UI/GroupDetails.css';
import './components/Layout/Header.css';
import './components/ModalWindow/UI/ModalWindow.css';
import './services/api.js';
import './utils/database.js';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Проверяем, авторизован ли пользователь
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
    
    // Проверяем сохраненную тему
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className={`App ${theme}-theme`}>
      <Routes>
        <Route path="/" element={
          isAuthenticated ? 
            <Navigate to="/groups" /> : 
            <Navigate to="/auth" />
        } />
        <Route path="/auth" element={
          isAuthenticated ? 
            <Navigate to="/groups" /> : 
            <AuthPage onLogin={handleLogin} />
        } />
        <Route path="/groups" element={
          isAuthenticated ? 
            <GroupPage onLogout={handleLogout} toggleTheme={toggleTheme} theme={theme} /> : 
            <Navigate to="/auth" />
        } />
        <Route path="/group/:groupId" element={
          isAuthenticated ? 
            <GroupPage onLogout={handleLogout} toggleTheme={toggleTheme} theme={theme} /> : 
            <Navigate to="/auth" />
        } />
        <Route path="/calendar/:groupId" element={
          isAuthenticated ? 
            <CalendarPage onLogout={handleLogout} toggleTheme={toggleTheme} theme={theme} /> : 
            <Navigate to="/auth" />
        } />
      </Routes>
    </div>
  );
}

export default App;