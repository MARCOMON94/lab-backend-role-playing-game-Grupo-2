const AppError = require('../utils/AppError')

/**
 * Middleware central de manejo de errores
 * Captura todos los errores (AppError y genéricos)
 * y devuelve respuestas JSON consistentes
 */
const errorHandler = (err, req, res, next) => {
  // Errores operacionales (AppError lanzados por la app)
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
      statusCode: err.statusCode,
      timestamp: new Date().toISOString(),
      path: req.originalUrl
    })
  }

  // Errores de validación JSON
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      error: 'JSON inválido en el body de la request',
      statusCode: 400,
      timestamp: new Date().toISOString(),
      path: req.originalUrl
    })
  }

  // Errores no operacionales (bugs en el código)
  console.error('❌ Error no manejado:', err)

  res.status(500).json({
    error: 'Error interno del servidor',
    statusCode: 500,
    timestamp: new Date().toISOString(),
    path: req.originalUrl
  })
}

module.exports = errorHandler
