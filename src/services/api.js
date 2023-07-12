import axios from 'axios'
import { toast } from 'react-toastify'

// Example login and register API functions
export async function getUsers() {
  try {
    const response = await axios.get("http://localhost:5000/users")
    return response.data.data
  } catch (error) {
    toast.error(error.response.data)
    return
  }
}

export async function getUser(userId) {
  try {
    const response = await axios.get(`http://localhost:5000/users/${userId}`)
    return response.data.data
  } catch (error) {
    toast.error(error.response.data)
    return
  }
}

export async function createUser(payload) {
  try {
    const response = await axios.post('http://localhost:5000/users', payload)
    return true
  } catch (error) {
    toast.error(error.response.data)
    return false
  }
}

export async function updateUser(userId, payload) {
  try {
    const response = await axios.put(`http://localhost:5000/users/${userId}`, payload)
    return true
  } catch (error) {
    toast.error(error.response.data)
    return false
  }
}

export async function deleteUser(userId) {
  try {
    const response = await axios.delete(`http://localhost:5000/users/${userId}`)
    return true
  } catch (error) {
    toast.error(error.response.data)
    return false
  }
}
