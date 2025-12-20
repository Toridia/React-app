
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from './UI/AuthForm';
import { authAPI } from '../../services/api.js';
import './AuthPage.css';
import { authAPI } from '../../services/api';

const AuthPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setError('');

    try {
      if (isLogin) {
        // Вход
        const response = await authAPI.login({
          username: formData.username,
          password: formData.password,
        });

        if (response.data.token) {
          onLogin(response.data.token);
          navigate('/groups');
        }
      } else {
        // Регистрация
        const response = await authAPI.register({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });

        if (response.data.token) {
          onLogin(response.data.token);
          navigate('/groups');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Произошла ошибка');
    }
  };

  const handleLogin = async (credentials) => {
    try {
      const data = await authAPI.login(credentials);
      localStorage.setItem('authToken', data.token);
      // Редирект после успешного входа
    } catch (error) {
      console.error('Ошибка входа:', error.message);
    }
  };

  const handleForgotPassword = () => {
    // Реализация восстановления пароля
    alert('Функция восстановления пароля в разработке');
  };

  return (
    <div className="auth-container">
      <div className="auth-logo">
        <h1>LITMO</h1>
      </div>

      <AuthForm
        isLogin={isLogin}
        onSubmit={handleSubmit}
        error={error}
      />

      <div className="auth-actions">
        {isLogin ? (
          <>
            <button
              type="button"
              className="auth-link-btn"
              onClick={() => setIsLogin(false)}
            >
              регистрация
            </button>
            <button
              type="button"
              className="auth-link-btn"
              onClick={handleForgotPassword}
            >
              забыли пароль?
            </button>
          </>
        ) : (
          <button
            type="button"
            className="auth-link-btn"
            onClick={() => setIsLogin(true)}
          >
            уже есть аккаунт? войти
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
