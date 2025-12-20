import { useNavigate } from 'react-router-dom';

const Header = ({ title, onBack, onLogout, toggleTheme, theme }) => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-left">
        {onBack && (
          <button className="back-btn" onClick={onBack}>
            ←
          </button>
        )}
        <h1>{title}</h1>
      </div>
      
      <div className="header-actions">
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <button className="logout-btn" onClick={onLogout}>
          Выйти
        </button>
      </div>
    </header>
  );
};

export default Header;