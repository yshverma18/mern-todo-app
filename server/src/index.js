import dotenv from 'dotenv';
dotenv.config(); // Must be at the top before any other imports

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import tasksRouter from './routes/tasks.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Todo API is running' });
});

app.use('/api/tasks', tasksRouter);

// Database connection and server start
async function start() {
  try {
    // Debug: Check if URI is loaded
    console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Loaded' : 'MISSING!');
    
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DB || 'todo_app'
    });
    console.log('✓ MongoDB connected');
    
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => console.log(`✓ API running on port ${PORT}`));
  } catch (err) {
    console.error('Server startup failed:', err);
    process.exit(1);
  }
}

start();

export default app;
