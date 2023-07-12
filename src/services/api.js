import axios from 'axios'

// Example login and register API functions
export async function getUsers() {
  try {
    const response = await axios.get("http://localhost:5000/users")
    console.log(response.data.data, "  ........get all users")
    return response.data.data
  } catch (error) {
    console.log(error)
    return error
  }
  //return response.data
}

export async function getUser(userId) {
  try {
    const response = await axios.get(`http://localhost:5000/users/${userId}`)
    return response.data.data
  } catch (error) {
    return error
  }
}

export async function createUser(payload) {
  try {
    const response = await axios.post('http://localhost:5000/users', payload)
    return response.data.data
  } catch (error) {
    return error
  }
}

export async function updateUser(userId, payload) {
  try {
    const response = await axios.put(`http://localhost:5000/users/${userId}`, payload)
    return response.data.data
  } catch (error) {
    return error
  }
}

export async function deleteUser(userId) {
  try {
    const response = await axios.delete(`http://localhost:5000/users/${userId}`)
    return response.data.data
  } catch (error) {
    return error
  }
}
