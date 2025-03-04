const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Role = require('../models/Role')
const { body, validationResult } = require('express-validator') // Afegeix express-validator
require('dotenv').config()

const router = express.Router()

// Validació per a registre d'usuari
const registerValidation = [
  body('username')
    .isLength({ min: 3 }).withMessage('Username ha de tenir almenys 3 caràcters')
    .not().isEmpty().withMessage('Username és obligatori'),
  body('password')
    .isLength({ min: 6 }).withMessage('Password ha de tenir almenys 6 caràcters')
    .not().isEmpty().withMessage('Password és obligatori'),
  body('role')
    .isIn(['admin', 'user']).withMessage('Rol invàlid. Ha de ser "admin" o "user"')
]

// Ruta de registre d'usuari
router.post('/register', registerValidation, async (req, res) => {
  // Comprovem si hi ha errors de validació
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { username, password, role } = req.body

  // Comprovem si l'usuari ja existeix
  const existingUser = await User.findOne({ where: { username } })
  if (existingUser) {
    return res.status(400).json({ message: 'Aquest usuari ja existeix' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  // Si no existeix el rol, el creem
  const userRole = await Role.findOne({ where: { name: role } }) || await Role.create({ name: role })

  // Creem l'usuari
  await User.create({ username, password: hashedPassword, RoleId: userRole.id })

  res.json({ message: 'Usuari registrat correctament' })
})

// Validació per a login d'usuari
const loginValidation = [
  body('username')
    .isLength({ min: 3 }).withMessage('Username ha de tenir almenys 3 caràcters')
    .not().isEmpty().withMessage('Username és obligatori'),
  body('password')
    .isLength({ min: 6 }).withMessage('Password ha de tenir almenys 6 caràcters')
    .not().isEmpty().withMessage('Password és obligatori')
]

// Ruta de login d'usuari
router.post('/login', loginValidation, async (req, res) => {
  // Comprovem si hi ha errors de validació
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { username, password } = req.body

  // Busquem l'usuari
  const user = await User.findOne({ where: { username }, include: Role })

  // Si no trobem l'usuari o la contrasenya no coincideix
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Credencials incorrectes' })
  }

  // Generem el token JWT
  const token = jwt.sign({ id: user.id, role: user.Role.name }, process.env.JWT_SECRET, { expiresIn: '1h' })

  // Retornem el token
  res.json({ token })
})

module.exports = router
