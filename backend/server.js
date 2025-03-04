const express = require('express')
const http = require('http')
const errorHandler = require('./middlewares/errorHandler')

const app = express()
const server = http.createServer(app)

server.listen(3000, () => console.log('Server running on port 3000'))

const requestRoutes = require('./routes/requests')
app.use('/requests', requestRoutes)
app.use(errorHandler)
