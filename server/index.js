const express = require('express');
const cors = require('cors');
const supabase = require('./supabase'); // Make sure supabase.js is in the same folder

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// GET all tasks
app.get('/tasks', async (req, res) => {
  const { data, error } = await supabase.from('tasks').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// POST a new task
app.post('/tasks', async (req, res) => {
  const { text } = req.body;
  const { data, error } = await supabase
    .from('tasks')
    .insert([{ text, completed: false }])
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

// PUT to toggle task completion
app.put('/tasks/:id', async (req, res) => {
  const id = req.params.id;

  const { data: current, error: getError } = await supabase
    .from('tasks')
    .select('*')
    .eq('id', id)
    .single();

  if (getError || !current) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const { data, error } = await supabase
    .from('tasks')
    .update({ completed: !current.completed })
    .eq('id', id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// DELETE a task
app.delete('/tasks/:id', async (req, res) => {
  const id = req.params.id;
  const { error } = await supabase.from('tasks').delete().eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  res.status(204).end();
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
