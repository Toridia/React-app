import React from 'react';

const GroupDetails = ({ group, onAddMembers, onGoToCalendar }) => {
  return (
    <div className="group-details">
      <div className="group-info">
        <h2 className="group-name">{group.name}</h2>
        <div className="group-members-count">{group.memberCount} участников</div>
      </div>
      
      <div className="group-actions-panel">
        <button className="action-btn" onClick={onAddMembers}>
          <span className="action-icon">+</span>
          добавить участников
        </button>
        <button className="action-btn secondary" onClick={onGoToCalendar}>
          <span className="action-icon">📅</span>
          перейти к календарю
        </button>
      </div>
      
      <div className="members-list">
        <h3>Участники группы</h3>
        {group.members && group.members.map((user, index) => (
          <div key={index} className="member-item">
            <div className="member-avatar">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="member-info">
              <div className="member-name">{user.username}</div>
              <div className="member-email">{user.email}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupDetails;
