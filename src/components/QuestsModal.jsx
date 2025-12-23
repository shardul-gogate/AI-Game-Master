export default function QuestsModal ({ quests, addNewQuest, updateQuest, deleteQuests }) {
  return (
    <div className="modal-overlay">
      <div className="large-modal">
      </div>
    </div>
  );
}

function QuestCard ({ quest }) {
  return (
    <div className="plot-point-card">
      <span>{quest.name}</span>
      <span>{quest.status}</span>
      <span>{quest.description}</span>
      {quest.objectives && quest.objectives.map((objective, index) => (
        <span key={index}>{objective}</span>
      ))}
    </div>
  )
}

function EditQuestCard ({}) {
  return (
    <div className="edit-quest-card">
    </div>
  )
}
