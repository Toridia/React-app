
const GroupCard = ({ group, onClick }) => {
  return (
    <div className="group-card" onClick={onClick}>
      <h3>{group.name}</h3>
      <div className="group-members">{group.memberCount} участников</div>
      <div className="group-actions">
        <button className="action-btn" onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}>
          Открыть
        </button>
      </div>
    </div>
  );
};

export default GroupCard;
