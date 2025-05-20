import { useEffect, useState } from 'react';

// ✅ Use your Render backend URL here
const API_BASE = 'https://task-manager-backend-mzwj.onrender.com';

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');

  // Fetch tasks on mount
  useEffect(() => {
    fetch(`${API_BASE}/tasks`)
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  // Add new task
  const handleAdd = async () => {
    if (!text.trim()) return;
    const res = await fetch(`${API_BASE}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const newTask = await res.json();
    setTasks([...tasks, newTask]);
    setText('');
  };

  // Toggle complete
  const handleToggle = async (id) => {
    const res = await fetch(`${API_BASE}/tasks/${id}`, {
      method: 'PUT',
    });
    const updatedTask = await res.json();
    setTasks(tasks.map(t => (t.id === id ? updatedTask : t)));
  };

  // Delete task
  const handleDelete = async (id) => {
    await fetch(`${API_BASE}/tasks/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Task Manager</h1>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="New task"
      />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <span
              onClick={() => handleToggle(task.id)}
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                cursor: 'pointer',
                marginRight: '1rem'
              }}
            >
              {task.text}
            </span>
            <button onClick={() => handleDelete(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
