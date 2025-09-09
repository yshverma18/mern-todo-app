
import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
})

export async function getTasks() {
  const { data } = await api.get('/tasks')
  return data
}

export async function createTask(body) {
  const { data } = await api.post('/tasks', body)
  return data
}

export async function updateTask(id, body) {
  const { data } = await api.put(`/tasks/${id}`, body)
  return data
}

export async function deleteTask(id) {
  await api.delete(`/tasks/${id}`)
}
