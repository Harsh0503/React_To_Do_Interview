import React, { useEffect, useState } from 'react';
import './index.css';

const ListView = ({ tasks, setTasks }) => {;

  const [draggedTask, setDraggedTask] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch('https://dummyjson.com/todos');
      const data = await res.json();

      const todos = data.todos.slice(0, 10).map((task) => {
        const status = task.completed
          ? 'completed'
          : Math.random() > 0.5
          ? 'inProgress'
          : 'todo';

        return { id: task.id, title: task.todo, status };
      });

      const grouped = {
        todo: todos.filter((t) => t.status === 'todo'),
        inProgress: todos.filter((t) => t.status === 'inProgress'),
        completed: todos.filter((t) => t.status === 'completed'),
      };

      setTasks(grouped);
    };

    fetchTodos();
  }, []);

  const handleDragStart = (task, status) => {
    setDraggedTask({ ...task, from: status });
  };

  const handleDrop = (status) => {
    if (!draggedTask) return;

    setTasks((prev) => {
      const newState = { ...prev };
      newState[draggedTask.from] = newState[draggedTask.from].filter(
        (t) => t.id !== draggedTask.id
      );
      newState[status] = [...newState[status], { ...draggedTask, status }];
      return newState;
    });

    setDraggedTask(null);
  };

  const allowDrop = (e) => e.preventDefault();

  const renderColumn = (status, title) => (
    <div
      className="column"
      onDrop={() => handleDrop(status)}
      onDragOver={allowDrop}
    >
      <h2 className="column-title">{title}</h2>
      {tasks[status].map((task) => (
        <div
          key={task.id}
          className="task-card"
          draggable
          onDragStart={() => handleDragStart(task, status)}
        >
          {task.title}
        </div>
      ))}
    </div>
  );

  return (
    <div className="board">
      {renderColumn('todo', 'To Do')}
      {renderColumn('inProgress', 'In Progress')}
      {renderColumn('completed', 'Completed')}
    </div>
  );
};

export default ListView;
