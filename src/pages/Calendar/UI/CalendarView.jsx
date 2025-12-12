import React from 'react';
import './CalendarView.css';

const CalendarView = ({ currentDate, events, onDateClick, viewMode }) => {
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const weekDays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
  const today = new Date();

  const generateDays = () => {
    const days = [];
    
    // Пустые дни в начале месяца
    for (let i = 0; i < (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1); i++) {
      days.push(null);
    }
    
    // Дни месяца
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      const dayEvents = events.filter(event => {
        const eventDate = new Date(event.startTime);
        return eventDate.getDate() === i && 
               eventDate.getMonth() === currentDate.getMonth() &&
               eventDate.getFullYear() === currentDate.getFullYear();
      });
      
      const isToday = 
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
      
      days.push({
        date,
        number: i,
        events: dayEvents,
        isToday,
      });
    }
    
    return days;
  };

  const days = generateDays();

  return (
    <div className={`calendar-view ${viewMode}`}>
      <div className="calendar-header-row">
        {weekDays.map(day => (
          <div key={day} className="day-header">
            {day}
          </div>
        ))}
      </div>
      
      <div className="calendar-days">
        {days.map((day, index) => (
          <div
            key={index}
            className={`day-cell ${day ? '' : 'empty'} ${day?.isToday ? 'today' : ''}`}
            onClick={() => day && onDateClick(day.date)}
          >
            {day && (
              <>
                <div className="day-number">{day.number}</div>
                {day.events.slice(0, 2).map((event, eventIndex) => (
                  <div key={eventIndex} className="day-event">
                    <div className="event-time">
                      {new Date(event.startTime).toLocaleTimeString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                    <div className="event-title">{event.title}</div>
                  </div>
                ))}
                {day.events.length > 2 && (
                  <div className="more-events">+{day.events.length - 2} ещё</div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarView;
