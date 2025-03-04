// src/config/api.js
export const API_URL = 'http://localhost:3000'

export const api = {
  login: async (data) => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return response.json()
  },
}
