import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function TaskEditModal({ isOpen, onClose, task }) {
  const [editedTitle, setEditedTitle] = useState(task.title);
//   const [editedDescription, setEditedDescription] = useState(task.description);

  const handleSave = () => {
    // Save the edited task
    // Call an API, update state, or perform any relevant action

    // Close the modal
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Edit Task Modal"
    >
      <h2>Edit Task</h2>
      <input
        type="text"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
      />
      {/* <textarea
        value={editedDescription}
        onChange={(e) => setEditedDescription(e.target.value)}
      /> */}
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </Modal>
  );
}

export default TaskEditModal;
