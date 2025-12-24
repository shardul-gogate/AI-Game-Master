import { useEffect, useRef, useState } from "react";
import { CardIconButtonEnum, IconButtonEnum, QuestStatusEnum } from "../utils/enums";
import { IconButton } from "./IconButton";
import { CardIconButton } from "./CardIconButton";
import { faScroll } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function QuestsModal ({ closeModal, quests, addNewQuest, updateQuest, deleteQuests }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)
  const [filter, setFilter] = useState('')

  const editQuest = (index) => {
    setIsEditing(true)
    setEditingIndex(index)
  }

  const handleEdit = (quest) => {
    updateQuest(editingIndex, quest)
    setIsEditing(false)
    setEditingIndex(null)
  }

  const cancelEdit = () => {
    setIsEditing(false)
    setEditingIndex(null)
  }

  return (
    <div className="modal-overlay">
      <div className="large-modal">
        <div className="close-large-modal">
          <span>Quests</span>
          <IconButton icon={IconButtonEnum.CLOSE} onClick={closeModal}/>
        </div>
        <input
          type="text"
          placeholder="Filter"
          value={filter}
          disabled={isEditing}
          onChange={(e) => setFilter(e.target.value)}
        />
        <div className="cards-grid">
          {
            quests.map((quest, index) => (
              (quest.name.toLowerCase().includes(filter.toLowerCase()) || quest.description.toLowerCase().includes(filter.toLowerCase())) && (
                isEditing && editingIndex === index ? (
                  <EditQuestCard
                    key={index}
                    quest={quest}
                    handleEdit={handleEdit}
                    cancelEdit={cancelEdit}
                  />
                ) : (
                  <QuestCard
                    key={index}
                    quest={quest}
                    addNewQuest={() => addNewQuest(index + 1)}
                    editQuest={() => editQuest(index)}
                    deleteQuest={() => deleteQuests(index)}
                  />
                )
              )
            ))
          }
        </div>
      </div>
    </div>
  );
}

function QuestCard ({ quest, addNewQuest, editQuest, deleteQuest}) {
  const className = quest.status.toLowerCase()
  return (
    <div className="quest-card">
      <div className="card-icon-button-row">
        <span className={`quest-status quest-${className}`}><FontAwesomeIcon icon={ faScroll } size='2x' /></span>
        <CardIconButton icon={CardIconButtonEnum.ADD} onClick={addNewQuest}/>
        <CardIconButton icon={CardIconButtonEnum.EDIT} onClick={editQuest}/>
        <CardIconButton icon={CardIconButtonEnum.DELETE} onClick={deleteQuest}/>
      </div>
      <span className="quest-name">{quest.name}</span>
      <span className="card-description">{quest.description}</span>
      {quest.objectives && quest.objectives.map((objective, index) => (
        <div key={index}>
          <input type="checkbox" checked={objective.completed} readOnly />
          <span>{objective.name}</span>
        </div>
      ))}
    </div>
  )
}

function EditQuestCard ({ quest, handleEdit, cancelEdit}) {
  const [name, setName] = useState(quest.name)
  const [status, setStatus] = useState(quest.status)
  const [description, setDescription] = useState(quest.description)
  const [objectives, setObjectives] = useState(quest.objectives)
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [description]);

  return (
    <div className="quest-card">
      <div className="card-icon-button-row">
        <select className="quest-status" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option className="quest-active" value={QuestStatusEnum.ACTIVE}>Active</option>
          <option className="quest-inactive" value={QuestStatusEnum.INACTIVE}>Inactive</option>
          <option className="quest-finished" value={QuestStatusEnum.FINISHED}>Finished</option>
        </select>
        <CardIconButton icon={CardIconButtonEnum.CANCEL} onClick={cancelEdit}/>
        <CardIconButton icon={CardIconButtonEnum.DONE} onClick={() => {handleEdit({ name, status, description, objectives })}}/>
      </div>
      <input
        type="text"
        value={name}
        onChange={(e) => {setName(e.target.value)}}
      />
      <textarea
        ref={textareaRef}
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <div className="quest-objectives-list">
        {
          objectives.map((objective, index) => (
            <div key={index} className="quest-objective">
              <input
                type="checkbox"
                checked={objective.completed}
                onChange={(e) => {
                  const newObjectives = objectives.map((obj, i) => i === index ? { ...obj, completed: e.target.checked } : obj);
                  setObjectives(newObjectives);
                }}
              />
              <input
                className="quest-objective name-input"
                type="text"
                value={objective.name}
                onChange={(e) => {
                  const newObjectives = objectives.map((obj, i) => i === index ? { ...obj, name: e.target.value } : obj);
                  setObjectives(newObjectives);
                }}
              />
            </div>
          ))
        }
        <CardIconButton icon={CardIconButtonEnum.ADD} onClick={() => {
          const newObjectives = [...objectives, { name: "", completed: false }];
          setObjectives(newObjectives);
        }}/>
      </div>
    </div>
  )
}
