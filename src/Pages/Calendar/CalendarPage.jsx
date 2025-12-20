
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CalendarView from './UI/CalendarView';
import EventList from './Events/EventList';
import ModalWindow from '../../components/ModalWindow/ModalWindow';
import { calendarAPI } from '../../services/api';
import { mockData } from '../../utils/database';
import Header from '../../components/Layout/Header';

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

  //Получить события
const fetchEvents = async (groupId) => {
  try {
    const events = await calendarAPI.getEvents(groupId, {
      month: currentMonth,
      year: currentYear
    });
    setEvents(events);
  } catch (error) {
    console.error('Ошибка загрузки событий:', error.message);
  }
};

// Создать событие
const createCalendarEvent = async (groupId, eventData) => {
  try {
    const event = await calendarAPI.createEvent(groupId, eventData);
    // Обновить календарь
  } catch (error) {
    console.error('Ошибка создания события:', error.message);
  }
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
