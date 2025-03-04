// routes/auth.js
const express = require('express')
const { body } = require('express-validator') // Afegeix express-validator
const { register, login } = require('../controllers/authController') // Importa les funcions del controlador

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
router.post('/register', registerValidation, register) // Utilitza el controlador per a la ruta de registre

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
router.post('/login', loginValidation, login) // Utilitza el controlador per a la ruta de login

module.exports = router
