// middlewares/errorHandler.js
module.exports = (err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Error intern del servidor' })
}
