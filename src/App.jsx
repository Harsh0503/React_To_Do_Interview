import React, { useState } from 'react';
import Navbar from './Compounds/Navbar';
import ListView from './Compounds/List';
import './App.css';

function App() {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    completed: [],
  });

  const addTask = (newTask) => {
    setTasks((prev) => ({
      ...prev,
      todo: [...prev.todo, { ...newTask, status: 'todo' }],
    }));
  };

  return (
    <>
      <Navbar onAddTask={addTask} />
      <ListView tasks={tasks} setTasks={setTasks} />
    </>
  );
}

export default App;
