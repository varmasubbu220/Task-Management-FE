import React, { useState } from 'react';
import styles from './TaskForm.module.css';

const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      onAdd(title, description);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <input
        className={styles.addTask}
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className={styles.addTask}
        type="text"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default TaskForm;
