import React from 'react';
import './EventList.css';

const EventList = ({ events, onEventClick }) => {
  const formatTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleDateString('ru-RU', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  };

  // Группировка событий по датам
  const groupEventsByDate = () => {
    const groups = {};
    
    events.forEach(event => {
      const date = new Date(event.startTime).toDateString();
      
      if (!groups[date]) {
        groups[date] = {
          date: new Date(event.startTime),
          events: [],
        };
      }
      
      groups[date].events.push(event);
    });
    
    // Сортировка по дате
    return Object.values(groups).sort((a, b) => a.date - b.date);
  };

  const eventGroups = groupEventsByDate();

  return (
    <div className="event-list">
      <h3 className="event-list-title">События этой недели</h3>
      
      {events.length === 0 ? (
        <div className="no-events">
          <p>Событий пока нет</p>
          <p className="no-events-hint">Нажмите на день в календаре, чтобы добавить событие</p>
        </div>
      ) : (
        eventGroups.map((group, index) => (
          <div key={index} className="event-group">
            <div className="event-group-date">
              {formatDate(group.date)}
            </div>
            
            <div className="events-container">
              {group.events.map(event => (
                <div
                  key={event.id}
                  className="event-item"
                  onClick={() => onEventClick(event)}
                >
                  <div className="event-time">
                    {formatTime(event.startTime)} - {formatTime(event.endTime)}
                  </div>
                  <div className="event-content">
                    <div className="event-title">{event.title}</div>
                    {event.description && (
                      <div className="event-description">
                        {event.description}
                      </div>
                    )}
                  </div>
                  <div className="event-more">
                    <span className="event-count">+3</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
      
      <button 
        className="add-event-btn"
        onClick={() => onEventClick(null)}
      >
        + Добавить событие
      </button>
    </div>
  );
};

export default EventList;
