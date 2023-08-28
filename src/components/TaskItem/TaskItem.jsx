import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './TaskItem.module.css';

const TaskItem = ({ task, onDelete, handleEditTask, onToggleStatus }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleEdit = () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      // Enter editing mode
      setIsEditing(true);
      setEditedTitle(task.title);
      setEditedDescription(task.description);
    }
  };

  const handleSave = () => {
    handleEditTask(task._id, editedTitle, editedDescription);

    // Exit editing mode
    setIsEditing(false);
  };

  return (
    <div 
      className={clsx(styles.task, isEditing && styles.isEditing)}
    >
      {isEditing ? <>
        <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <img onClick={handleSave} width="40" height="40" src="https://img.icons8.com/external-febrian-hidayat-glyph-febrian-hidayat/64/228BE6/external-check-ui-essential-febrian-hidayat-glyph-febrian-hidayat.png" alt="external-check-ui-essential-febrian-hidayat-glyph-febrian-hidayat"/>
          <img onClick={() => setIsEditing(false)} width="36" height="36" src="https://img.icons8.com/office/40/cancel.png" alt="cancel"/>
        </>
      : <>
        <h3>{task.title}</h3>
        <div>{task.description}</div>
        <div className={styles.actions}>
          {!task.completed ? <img onClick={() => onToggleStatus(task._id, !task.completed)}  width="40" height="40" src="https://img.icons8.com/color/48/checked--v1.png" alt="checked--v1"/>
          : <img onClick={() => onToggleStatus(task._id, !task.completed)} width="36" height="36" src="https://img.icons8.com/office/40/cancel.png" alt="cancel"/>}
          <img onClick={handleEdit} width="32" height="32" src="https://img.icons8.com/pastel-glyph/64/228BE6/create-new--v1.png" alt="create-new--v1"/>
          <img onClick={() => onDelete(task._id)} width="40" height="40" src="https://img.icons8.com/color/48/trash--v1.png" alt="trash--v1"/>
        </div>
      </>}
    </div>
  );
}

export default TaskItem;
