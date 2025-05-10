import React, { useState } from 'react';
import './index.css';

const Navbar = ({ onAddTask }) => {
  const [taskCreate, setTaskCreate] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      onAddTask({ id: Date.now(), title: taskTitle });
      setTaskTitle('');
      setTaskCreate(false);
    }
  };

  return (
    <>
      {taskCreate && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Create New Task</h3>
            <form onSubmit={handleSubmit}>
              <input
               style={{
                width: "100%"
               }}
                type="text"
                placeholder="Enter task title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                required
              />
              <div className="modal-actions">
                <button type="submit">Add</button>
                <button onClick={() => setTaskCreate(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="navbar">
        <h1>To Do List</h1>
        <button onClick={() => setTaskCreate(true)}>Create Task</button>
      </div>
    </>
  );
};

export default Navbar;
