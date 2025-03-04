const express = require('express')
const Request = require('../models/Request')
const auth = require('../middlewares/auth')

const router = express.Router()

// Crear una nueva petición (solo usuarios autenticados)
router.post('/', auth, async (req, res) => {
  const { title, description } = req.body
  const newRequest = await Request.create({ title, description, UserId: req.user.id })
  res.json(newRequest)
})

// Obtener todas las peticiones (cualquiera puede verlas)
router.get('/', async (req, res) => {
  const requests = await Request.findAll()
  res.json(requests)
})

// Marcar una petición como completada (solo admins)
router.put('/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'No tienes permisos' })
  }

  const request = await Request.findByPk(req.params.id)
  if (!request) return res.status(404).json({ message: 'Petición no encontrada' })

  request.status = 'completada'
  await request.save()

  res.json({ message: 'Petición completada' })
})

module.exports = router
