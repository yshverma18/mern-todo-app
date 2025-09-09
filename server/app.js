
const express = require('express');
const cors = require('cors');
const tasksRouter = require('./src/routes/tasks');

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.use('/api/tasks', tasksRouter);

module.exports = app;
