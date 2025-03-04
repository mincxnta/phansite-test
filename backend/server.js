const express = require('express')
const http = require('http')
const sequelize = require('./config/database') // Inclou la connexió de Sequelize
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')

// Afegim la ruta de l'autenticació
const authRoutes = require('./routes/auth') // Afegim la ruta de l'autenticació

const app = express()

// Configura CORS
const corsOptions = {
  origin: 'http://localhost:5173', // Permet sol·licituds només des del frontend en aquest port
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Permet els mètodes que necessites
  allowedHeaders: ['Content-Type', 'Authorization'] // Permet encapçalaments específics
}

app.use(cors(corsOptions)) // Utilitza CORS amb les opcions configurades

// Configura express per poder llegir JSON
app.use(express.json()) // Perquè puguis fer POST amb JSON

// Creem el servidor HTTP amb Express
const server = http.createServer(app)

// Sincronitza les taules de Sequelize amb la base de dades
sequelize.sync({ force: false })
  .then(() => {
    console.log('Totes les taules estan sincronitzades!')
  })
  .catch((err) => {
    console.error('Error al sincronitzar la base de dades:', err)
  })

// Configura les rutes
const requestRoutes = require('./routes/requests')
app.use('/requests', requestRoutes)

// Afegeix la ruta d'autenticació
app.use('/auth', authRoutes) // Afegeix la ruta d'autenticació

// Error handler
app.use(errorHandler)

// Inicia el servidor HTTP a un port, per exemple el 3000
server.listen(3000, () => {
  console.log('Servidor HTTP corrent a http://localhost:3000')
})
