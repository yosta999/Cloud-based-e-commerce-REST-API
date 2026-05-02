const Log = require('../models/Log');

module.exports = (req, res, next) => {
  const start = Date.now();
  res.on('finish', async () => {
    const duration = Date.now() - start;
    try {
      await Log.create({
        ip: req.ip || req.connection?.remoteAddress || 'unknown',
        endpoint: req.originalUrl,
        statusCode: res.statusCode,
        responseTime: duration
      });
    } catch (err) {
      console.error('Logging failed:', err);
    }
  });
  next();
};
