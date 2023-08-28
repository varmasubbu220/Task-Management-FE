import React, { useEffect, useState } from 'react';
import TaskItem from '../TaskItem/TaskItem';
import styles from './TaskList.module.css';

const TaskList = ({ tasks, onDelete, handleEditTask, onToggleStatus }) => {
    const [completedTasks, setCompletedTasks] = useState([]);
    const [inCompleteTasks, setInCompleteTasks] = useState([]);

    useEffect(() => {
        splitTasks(tasks)
    }, [tasks])

    const splitTasks = (allTasks) => {
        const completedTasks = [];
        const inCompleteTasks = [];
        allTasks.forEach((task) => {
            if (task.completed) {
                completedTasks.push(task);
            } else {
                inCompleteTasks.push(task);
            }
        })

        setCompletedTasks(completedTasks);
        setInCompleteTasks(inCompleteTasks);
    }

  return (
    <div className={styles.taskList}>
      <div className={styles.inCompleteTasks}>
        <div className={styles.header}>Todo</div>
        <div>
          {inCompleteTasks.length > 0 ? inCompleteTasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onDelete={onDelete}
              onToggleStatus={onToggleStatus}
              handleEditTask={handleEditTask}
            />
          )) : <div className={styles.placeholder}>No Tasks</div>}
        </div>
      </div>
      <div className={styles.completedTasks}>
        <div className={styles.header}>Completed Tasks</div>
        <div>
          {completedTasks.length > 0 ? completedTasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onDelete={onDelete}
              onToggleStatus={onToggleStatus}
              handleEditTask={handleEditTask}
            />
          )) : <div className={styles.placeholder}>No Tasks</div>}
        </div>
      </div>
    </div>
  );
}
export default TaskList;
