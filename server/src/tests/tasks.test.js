import dotenv from 'dotenv';
// Load test environment variables
if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: '.env.test' });
} else {
  dotenv.config();
}

import { jest, test, expect, beforeAll, afterEach, afterAll } from '@jest/globals';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../index.js';
import Task from '../models/Task.js';

jest.setTimeout(30000);

beforeAll(async () => {
  // Use dedicated test database URI
  const testUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/todo_test';
  
  // Disconnect any existing connection first
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
  
  // Connect to test database
  await mongoose.connect(testUri, { dbName: 'todo_test_db' });
  console.log('Connected to test database');
});

afterEach(async () => {
  // Clear only test data
  await Task.deleteMany({});
});

afterAll(async () => {
  // Clean up and close test connection
  await Task.deleteMany({});
  await mongoose.connection.close();
  console.log('Test database connection closed');
});


// Test 1: POST /api/tasks creates a task
test('POST /api/tasks creates a task', async () => {
  const res = await request(app)
    .post('/api/tasks')
    .send({ title: 'Test task creation' });
  
  expect(res.status).toBe(201);
  expect(res.body.title).toBe('Test task creation');
  expect(res.body.completed).toBe(false);
  expect(res.body).toHaveProperty('_id');
});

// Test 2: DELETE /api/tasks/:id deletes the task
test('DELETE /api/tasks/:id deletes the task', async () => {
  // First create a task
  const created = await request(app)
    .post('/api/tasks')
    .send({ title: 'Task to delete' });
  
  const taskId = created.body._id;
  
  // Then delete it
  const deleteRes = await request(app)
    .delete(`/api/tasks/${taskId}`);
  
  expect(deleteRes.status).toBe(200);
  expect(deleteRes.body.success).toBe(true);
  
  // Verify it's actually deleted
  const getRes = await request(app).get('/api/tasks');
  expect(getRes.body.find(task => task._id === taskId)).toBeUndefined();
});
