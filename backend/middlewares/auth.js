const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = function (req, res, next) {
  const token = req.headers.authorization
  if (!token) return res.status(403).json({ message: 'Token requerido' })

  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(401).json({ message: 'Token inválido' })
    req.user = user
    next()
  })
}
