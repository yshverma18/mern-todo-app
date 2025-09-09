// import { useEffect, useState } from 'react';
// import { fetchTasks, addTask, updateTask, deleteTask } from './api';
// import './App.css';

// function App() {
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [submitting, setSubmitting] = useState(false);

//   // Load tasks on component mount
//   useEffect(() => {
//     loadTasks();
//   }, []);

//   const loadTasks = async () => {
//     try {
//       setLoading(true);
//       setError('');
//       const data = await fetchTasks();
//       setTasks(data);
//     } catch (err) {
//       setError('Failed to load tasks. Please check your connection.');
//       console.error('Error loading tasks:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddTask = async (e) => {
//     e.preventDefault();
//     if (!newTask.trim()) return;

//     try {
//       setSubmitting(true);
//       const task = await addTask(newTask.trim());
//       setTasks(prev => [task, ...prev]);
//       setNewTask('');
//     } catch (err) {
//       setError('Failed to add task. Please try again.');
//       console.error('Error adding task:', err);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleToggleComplete = async (id, completed) => {
//     try {
//       const updatedTask = await updateTask(id, { completed: !completed });
//       setTasks(prev => prev.map(task => 
//         task._id === id ? updatedTask : task
//       ));
//     } catch (err) {
//       setError('Failed to update task. Please try again.');
//       console.error('Error updating task:', err);
//     }
//   };

//   const handleUpdateTitle = async (id, newTitle) => {
//     if (!newTitle.trim()) return;
    
//     try {
//       const updatedTask = await updateTask(id, { title: newTitle.trim() });
//       setTasks(prev => prev.map(task => 
//         task._id === id ? updatedTask : task
//       ));
//     } catch (err) {
//       setError('Failed to update task. Please try again.');
//       console.error('Error updating task:', err);
//     }
//   };

//   const handleDeleteTask = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this task?')) return;

//     try {
//       await deleteTask(id);
//       setTasks(prev => prev.filter(task => task._id !== id));
//     } catch (err) {
//       setError('Failed to delete task. Please try again.');
//       console.error('Error deleting task:', err);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="app">
//         <div className="loading">Loading tasks...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="app">
//       <header className="app-header">
//         <h1>📝 To-Do List</h1>
//         <p>Manage your tasks efficiently</p>
//       </header>

//       {error && (
//         <div className="error-banner">
//           {error}
//           <button onClick={() => setError('')} className="close-error">×</button>
//         </div>
//       )}

//       <form onSubmit={handleAddTask} className="add-task-form">
//         <input
//           type="text"
//           value={newTask}
//           onChange={(e) => setNewTask(e.target.value)}
//           placeholder="Add a new task..."
//           className="task-input"
//           disabled={submitting}
//         />
//         <button 
//           type="submit" 
//           className="add-button"
//           disabled={submitting || !newTask.trim()}
//         >
//           {submitting ? 'Adding...' : 'Add Task'}
//         </button>
//       </form>

//       <div className="tasks-container">
//         {tasks.length === 0 ? (
//           <div className="empty-state">
//             <p>No tasks yet. Add one above to get started!</p>
//           </div>
//         ) : (
//           <div className="tasks-list">
//             {tasks.map(task => (
//               <TaskItem
//                 key={task._id}
//                 task={task}
//                 onToggle={handleToggleComplete}
//                 onUpdate={handleUpdateTitle}
//                 onDelete={handleDeleteTask}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       <footer className="app-footer">
//         <p>Total tasks: {tasks.length} | Completed: {tasks.filter(t => t.completed).length}</p>
//       </footer>
//     </div>
//   );
// }

// function TaskItem({ task, onToggle, onUpdate, onDelete }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editValue, setEditValue] = useState(task.title);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (editValue.trim() && editValue !== task.title) {
//       onUpdate(task._id, editValue);
//     }
//     setIsEditing(false);
//   };

//   const handleCancel = () => {
//     setEditValue(task.title);
//     setIsEditing(false);
//   };

//   return (
//     <div className={`task-item ${task.completed ? 'completed' : ''}`}>
//       <input
//         type="checkbox"
//         checked={task.completed}
//         onChange={() => onToggle(task._id, task.completed)}
//         className="task-checkbox"
//       />

//       {isEditing ? (
//         <form onSubmit={handleSubmit} className="edit-form">
//           <input
//             type="text"
//             value={editValue}
//             onChange={(e) => setEditValue(e.target.value)}
//             className="edit-input"
//             autoFocus
//           />
//           <button type="submit" className="save-btn">Save</button>
//           <button type="button" onClick={handleCancel} className="cancel-btn">Cancel</button>
//         </form>
//       ) : (
//         <>
//           <span 
//             className="task-text"
//             onDoubleClick={() => setIsEditing(true)}
//           >
//             {task.title}
//           </span>
//           <div className="task-actions">
//             <button 
//               onClick={() => setIsEditing(true)}
//               className="edit-btn"
//             >
//               Edit
//             </button>
//             <button 
//               onClick={() => onDelete(task._id)}
//               className="delete-btn"
//             >
//               Delete
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default App;

import { useState, useEffect } from "react";
import { fetchTasks, addTask, updateTask, deleteTask } from "./api";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      setLoading(true);
      const data = await fetchTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddTask(e) {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    try {
      const added = await addTask(newTask);
      setTasks(prev => [added, ...prev]);
      setNewTask("");
      setError(null);
    } catch (err) {
      setError("Failed to add task");
    }
  }

  async function handleToggleComplete(id, completed) {
    try {
      const updated = await updateTask(id, { completed: !completed });
      setTasks(prev => prev.map(task => 
        task._id === id ? updated : task
      ));
      setError(null);
    } catch (err) {
      setError("Failed to update task");
    }
  }

  async function handleDeleteTask(id) {
    if (!confirm("Are you sure you want to delete this task?")) return;
    
    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(task => task._id !== id));
      setError(null);
    } catch (err) {
      setError("Failed to delete task");
    }
  }

  async function handleEditTask(id, newTitle) {
    if (!newTitle.trim()) return;
    
    try {
      const updated = await updateTask(id, { title: newTitle });
      setTasks(prev => prev.map(task => 
        task._id === id ? updated : task
      ));
      setError(null);
    } catch (err) {
      setError("Failed to edit task");
    }
  }

  if (loading) {
    return (
      <div className="app">
        <div className="loading">Loading tasks...</div>
      </div>
    );
  }

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className="app">
      <header className="header">
        <h1>📝 My Todo List</h1>
        <div className="stats">
          {totalTasks > 0 && (
            <span>{completedTasks} of {totalTasks} completed</span>
          )}
        </div>
      </header>

      {error && (
        <div className="error">
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      <form onSubmit={handleAddTask} className="add-form">
        <input
          type="text"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="add-input"
        />
        <button type="submit" className="add-btn">
          Add Task
        </button>
      </form>

      {tasks.length === 0 ? (
        <div className="empty">
          <p>No tasks yet. Add one above!</p>
        </div>
      ) : (
        <ul className="task-list">
          {tasks.map(task => (
            <TaskItem
              key={task._id}
              task={task}
              onToggle={handleToggleComplete}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(task.title);

  function handleSubmit(e) {
    e.preventDefault();
    if (inputValue.trim() && inputValue !== task.title) {
      onEdit(task._id, inputValue);
    }
    setIsEditing(false);
  }

  function handleCancel() {
    setInputValue(task.title);
    setIsEditing(false);
  }

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task._id, task.completed)}
        className="task-checkbox"
      />

      {isEditing ? (
        <form onSubmit={handleSubmit} className="edit-form">
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            className="edit-input"
            autoFocus
          />
          <div className="edit-actions">
            <button type="submit" className="save-btn">Save</button>
            <button type="button" onClick={handleCancel} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <span 
            className="task-text"
            onDoubleClick={() => setIsEditing(true)}
            title="Double-click to edit"
          >
            {task.title}
          </span>
          <div className="task-actions">
            <button 
              onClick={() => setIsEditing(true)}
              className="edit-btn"
            >
              ✏️
            </button>
            <button 
              onClick={() => onDelete(task._id)}
              className="delete-btn"
            >
              🗑️
            </button>
          </div>
        </>
      )}
    </li>
  );
}

