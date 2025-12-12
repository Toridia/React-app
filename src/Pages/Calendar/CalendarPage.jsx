
/*функции:
- календарь при движении вверх по нему уменьшается до одной строчки
- добавление событий
- при нажатии на месяц и год можно выбрать их
- при нажатии на событие его можно изменять и удалять
- при выборе дня показывается события на этот день
- смах влево и вправо это переход по месяцам
*/

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CalendarView from './UI/CalendarView';
import EventList from './Events/EventList';
import ModalWindow from '../../components/ModalWindow/ModalWindow';
import { calendarAPI } from '../../services/api';
import { mockData } from '../../utils/database';
import Header from '../../components/Layout/Header';
import './CalendarPage.css';

const CalendarPage = ({ onLogout, toggleTheme, theme }) => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [viewMode, setViewMode] = useState('month'); // 'week' или 'month'

  useEffect(() => {
    fetchEvents();
  }, [currentDate, groupId]);

  const fetchEvents = async () => {
    try {
      // Для демонстрации используем моки
      setEvents(mockData.events.filter(e => e.groupId === parseInt(groupId)));
      
      // В реальном проекте:
      // const response = await calendarAPI.getEvents(groupId, {
      //   month: currentDate.getMonth() + 1,
      //   year: currentDate.getFullYear()
      // });
      // setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setSelectedDate(null);
  };

  const handleSaveEvent = async (eventData) => {
    try {
      // Для демонстрации
      alert(`Событие сохранено: ${eventData.title}`);
      
      // В реальном проекте:
      // if (selectedEvent) {
      //   await calendarAPI.updateEvent(groupId, selectedEvent.id, eventData);
      // } else {
      //   await calendarAPI.createEvent(groupId, eventData);
      // }
      // fetchEvents();
      // handleModalClose();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Удалить это событие?')) {
      try {
        // Для демонстрации
        alert('Событие удалено');
        
        // В реальном проекте:
        // await calendarAPI.deleteEvent(groupId, eventId);
        // fetchEvents();
        // handleModalClose();
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const handlePrevPeriod = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setDate(newDate.getDate() - 7);
    }
    setCurrentDate(newDate);
  };

  const handleNextPeriod = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else {
      newDate.setDate(newDate.getDate() + 7);
    }
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleBackToGroups = () => {
    navigate(`/group/${groupId}`);
  };

  return (
    <div className="calendar-page">
      <Header 
        title="Календарь"
        onBack={handleBackToGroups}
        onLogout={onLogout}
        toggleTheme={toggleTheme}
        theme={theme}
      />
      
      <div className="calendar-controls">
        <button className="calendar-btn" onClick={handlePrevPeriod}>←</button>
        <button className="calendar-btn today-btn" onClick={handleToday}>Сегодня</button>
        <div className="calendar-title">
          {currentDate.toLocaleDateString('ru-RU', { 
            month: 'long', 
            year: 'numeric' 
          })}
        </div>
        <button className="calendar-btn" onClick={handleNextPeriod}>→</button>
        
        <div className="view-toggle">
          <button 
            className={`view-btn ${viewMode === 'month' ? 'active' : ''}`}
            onClick={() => setViewMode('month')}
          >
            Месяц
          </button>
          <button 
            className={`view-btn ${viewMode === 'week' ? 'active' : ''}`}
            onClick={() => setViewMode('week')}
          >
            Неделя
          </button>
        </div>
      </div>
      
      <div className="calendar-content">
        <div className="calendar-main">
          <CalendarView
            currentDate={currentDate}
            events={events}
            onDateClick={handleDateClick}
            viewMode={viewMode}
          />
        </div>
        
        <div className="calendar-sidebar">
          <EventList
            events={events}
            onEventClick={handleEventClick}
          />
        </div>
      </div>
      
      {isModalOpen && (
        <ModalWindow
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSave={handleSaveEvent}
          onDelete={selectedEvent ? () => handleDeleteEvent(selectedEvent.id) : null}
          event={selectedEvent}
          date={selectedDate}
        />
      )}
    </div>
  );
};

export default CalendarPage;
