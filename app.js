const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimiter = require('./src/middleware/rateLimiter');
const logger = require('./src/middleware/logger');
const errorHandler = require('./src/middleware/errorHandler');

const authRoutes = require('./src/routes/authRoutes');
const productRoutes = require('./src/routes/productRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const threatRoutes = require('./src/routes/threatRoutes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use(logger);

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/threat', threatRoutes);

app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use(errorHandler);

module.exports = app;
