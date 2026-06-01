const express = require('express');
const productRoutes = require('./routes/product.routes');
const { errorHandler } = require('./middleware/error.middleware');

const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/productos', productRoutes);
app.use(errorHandler);

module.exports = app;
