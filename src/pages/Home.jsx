import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from '../components/TaskList/TaskList';
import TaskForm from '../components/TaskForm/TaskForm';
import Swal from 'sweetalert2'

function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});
  useEffect(() => {
      api.get('/api/tasks').then((response) => {
        setTasks(response.data);
        setLoading(false);
      });
  }, []);

  const handleAddTask = (title, description) => {
    api.post('/api/tasks', { title, description }).then((response) => {
      setTasks([...tasks, response.data]);
    });
  };

  const handleDeleteTask = (taskId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        api.delete(`/api/tasks/${taskId}`).then(() => {
          setTasks(tasks.filter((task) => task._id !== taskId));
        });
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })

  
  };

  const handleToggleStatus = (taskId, newStatus) => {
    api.put(`/api/tasks/${taskId}`, { completed: newStatus }).then(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, completed: newStatus } : task
        )
      );
    });
  };
  const handleEditTask = (taskId, title, description) => {
    api.put(`/api/tasks/${taskId}`, { title, description }).then(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, title, description } : task
        )
      );
    });
  };

  return (
    <div data-testid="home-container">
    <h1 className="title">Task Management App</h1>
    {loading ? (
      <div className="loading">
        <img
          data-testid="loading-image"
          width="100"
          src="/loading.gif"
          alt="loading"
        />
      </div>
    ) : (
      <div>
        <TaskForm onAdd={handleAddTask} />
        <TaskList
          tasks={tasks}
          onDelete={handleDeleteTask}
          onToggleStatus={handleToggleStatus}
          handleEditTask={handleEditTask}
        />
      </div>
    )}
  </div>
  );
}

export default Home;
