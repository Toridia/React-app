/*функии:
- взмах вниз и он скрывается
- дату выбранную высвечивает
- изменить событие можно в нем (время, участников, событие)
*/

import { useState, useEffect } from 'react';
import './ModalWindow.css';

const ModalWindow = ({ isOpen, onClose, onSave, onDelete, event, date }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
  });

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        description: event.description,
        startTime: event.startTime.substring(11, 16),
        endTime: event.endTime.substring(11, 16),
      });
    } else if (date) {
      const defaultDate = date.toISOString().split('T')[0];
      setFormData({
        title: '',
        description: '',
        startTime: '08:45',
        endTime: '09:00',
        date: defaultDate,
      });
    }
  }, [event, date]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const eventData = {
      ...formData,
      startTime: `${formData.date || date.toISOString().split('T')[0]}T${formData.startTime}:00`,
      endTime: `${formData.date || date.toISOString().split('T')[0]}T${formData.endTime}:00`,
    };
    
    onSave(eventData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{event ? 'Редактировать событие' : 'Новое событие'}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Дата</label>
            <input
              type="date"
              name="date"
              value={formData.date || date.toISOString().split('T')[0]}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Начало</label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Конец</label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Название события</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Описание события"
            />
          </div>
          
          <div className="form-group">
            <label>Описание</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="текст описание что будет в событии если надо"
            />
          </div>
          
          <div className="modal-actions">
            {event && onDelete && (
              <button
                type="button"
                className="modal-btn delete-btn"
                onClick={onDelete}
              >
                Удалить
              </button>
            )}
            <button
              type="button"
              className="modal-btn cancel-btn"
              onClick={onClose}
            >
              Отмена
            </button>
            <button
              type="submit"
              className="modal-btn save-btn"
            >
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalWindow;