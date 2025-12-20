import { useState } from 'react';
import './AuthForm.css';

const AuthForm = ({ isLogin, onSubmit, error }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {error && <div className="auth-error">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="username">логин</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          placeholder="Введите логин"
        />
      </div>
      
      {!isLogin && (
        <div className="form-group">
          <label htmlFor="email">email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Введите email"
          />
        </div>
      )}
      
      <div className="form-group">
        <label htmlFor="password">пароль</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Введите пароль"
          minLength="6"
        />
      </div>
      
      {!isLogin && (
        <div className="form-group">
          <label htmlFor="confirmPassword">подтвердите пароль</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Подтвердите пароль"
            minLength="6"
          />
        </div>
      )}
      
      <button type="submit" className="auth-submit-btn">
        {isLogin ? 'войти' : 'зарегистрироваться'}
      </button>
    </form>
  );
};

export default AuthForm;
