// Примерная структура для подключения к MySQL через PHPMyAdmin

export const databaseConfig = {
  host: 'localhost',
  user: 'root', // Ваш пользователь MySQL
  password: '', // Ваш пароль MySQL
  database: 'calendar_app', // Название базы данных
  port: 3306
};

// Примерные SQL таблицы для создания в PHPMyAdmin:

/*
CREATE DATABASE IF NOT EXISTS calendar_app;
USE calendar_app;

-- Таблица пользователей
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица групп
CREATE TABLE groups (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Таблица участников групп
CREATE TABLE group_members (
  group_id INT,
  user_id INT,
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (group_id, user_id),
  FOREIGN KEY (group_id) REFERENCES groups(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Таблица событий календаря
CREATE TABLE events (
  id INT PRIMARY KEY AUTO_INCREMENT,
  group_id INT,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  start_time DATETIME NOT NULL,
  end_time DATETIME NOT NULL,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (group_id) REFERENCES groups(id),
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Таблица уведомлений о событиях
CREATE TABLE event_notifications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  event_id INT,
  user_id INT,
  notified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
*/

// Для тестирования
export const mockData = {
  users: [
    { id: 1, username: 'user1', email: 'user1@example.com' },
    { id: 2, username: 'user2', email: 'user2@example.com' },
    { id: 3, username: 'user3', email: 'user3@example.com' },
  ],
  groups: [
    { id: 1, name: 'Название группы', memberCount: 15, createdBy: 1 },
    { id: 2, name: 'Рабочая группа', memberCount: 8, createdBy: 2 },
    { id: 3, name: 'Семейный календарь', memberCount: 4, createdBy: 1 },
  ],
  events: [
    {
      id: 1,
      groupId: 1,
      title: 'Описание события',
      description: 'текст описание что будет в событии если надо',
      startTime: '2025-05-07T08:45:00',
      endTime: '2025-05-07T09:00:00',
      createdBy: 1,
    },
    {
      id: 2,
      groupId: 1,
      title: 'Встреча команды',
      description: 'Еженедельная встреча для обсуждения прогресса',
      startTime: '2025-05-08T14:00:00',
      endTime: '2025-05-08T15:30:00',
      createdBy: 2,
    },
  ],
};
