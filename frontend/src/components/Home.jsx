import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1>Benvingut a la teva aplicació!</h1>
      <p>Si no estàs registrat, <Link to="/register">fes-ho aquí</Link></p>
      <p>Si ja tens un compte, <Link to="/login">entra aquí</Link></p>
    </div>
  )
}

export default Home
