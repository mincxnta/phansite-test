// frontend/src/components/Register.jsx
import React, { useState } from 'react'
import { API_URL } from '../config/api'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user') // Per defecte, el rol serà 'user'
  const navigate = useNavigate()  

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = { username, password, role }

    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    const result = await response.json()

    if (response.ok) {
      alert(result.message) // Missatge de registre correcte
      navigate('/login')
    } else {
      alert('Error al registrar-se!')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="user">Usuari</option>
        <option value="admin">Administrador</option>
      </select>
      <button type="submit">Registrar-se</button>
    </form>
  )
}

export default Register
