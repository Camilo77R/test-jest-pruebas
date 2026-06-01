function errorHandler(error, _req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Datos inválidos',
      details: Object.values(error.errors).map((item) => item.message),
    });
  }

  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'ID de producto inválido' });
  }

  if (error.code === 11000) {
    return res.status(409).json({ error: 'Ya existe un producto con ese código' });
  }

  return res.status(500).json({ error: 'Error interno del servidor' });
}

module.exports = {
  errorHandler,
};
