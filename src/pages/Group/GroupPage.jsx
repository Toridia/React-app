
/*
Страница мои группы после нажатия на группу

- Стрелочка отправляет назад

- Название группы можно менять
- Число участников меняется от количества userов  

- Кнопка "Добавить участников"
- Кнопка "Перейти к календарю"
 
- Имя userа можно менять при нажатии на него
- Цвет вместо аватарки с буквой
- Картинка группы можно менять

- кнопки навигации добавить
*/
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GroupCard from './UI/GroupCard';
import GroupDetails from './UI/GroupDetails';
import { mockData } from '../../utils/database';
import Header from '../../components/Layout/Header';

const GroupPage = ({ onLogout, toggleTheme, theme }) => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    if (groupId) {
      fetchGroupDetails(groupId);
    } else {
      setSelectedGroup(null);
    }
  }, [groupId]);

  const fetchGroups = async () => {
    try {
      // Для демонстрации используем моки
      setGroups(mockData.groups);
      
      // В реальном проекте:
      // const response = await groupsAPI.getAll();
      // setGroups(response.data);
    } catch (error) {
      console.error('Error fetching groups:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGroupDetails = async (id) => {
    try {
      // Для демонстрации используем моки
      const group = mockData.groups.find(g => g.id === parseInt(id));
      if (group) {
        setSelectedGroup({
          ...group,
          members: mockData.users.slice(0, 4) // Первые 4 пользователя как пример
        });
      }
      
      // В реальном проекте:
      // const response = await groupsAPI.getById(id);
      // setSelectedGroup(response.data);
    } catch (error) {
      console.error('Error fetching group details:', error);
    }
  };

  const handleGroupClick = (groupId) => {
    navigate(`/group/${groupId}`);
  };

  const handleBackClick = () => {
    navigate('/groups');
  };

  const handleAddMembers = () => {
    const newMember = prompt('Введите имя нового участника:');
    if (newMember) {
      alert(`Участник "${newMember}" добавлен!`);
      // В реальном проекте:
      // await groupsAPI.addMember(selectedGroup.id, newMember);
      // fetchGroupDetails(selectedGroup.id);
    }
  };

  const handleGoToCalendar = () => {
    if (selectedGroup) {
      navigate(`/calendar/${selectedGroup.id}`);
    }
  };

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <div className="group-page">
      <Header 
        title={selectedGroup ? selectedGroup.name : "Мои группы"}
        onBack={selectedGroup ? handleBackClick : null}
        onLogout={onLogout}
        toggleTheme={toggleTheme}
        theme={theme}
      />
      
      <div className="page-container">
        {selectedGroup ? (
          <GroupDetails
            group={selectedGroup}
            onAddMembers={handleAddMembers}
            onGoToCalendar={handleGoToCalendar}
          />
        ) : (
          <>
            <h2 className="page-title">Мои группы</h2>
            <div className="groups-list">
              {groups.map(group => (
                <GroupCard
                  key={group.id}
                  group={group}
                  onClick={() => handleGroupClick(group.id)}
                />
              ))}
              <div className="add-group-card" onClick={() => alert('Создание группы в разработке')}>
                <div className="add-icon">+</div>
                <div className="add-text">Создать новую группу</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GroupPage;
