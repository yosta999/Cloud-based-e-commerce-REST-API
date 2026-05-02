const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  endpoint: { type: String, required: true },
  statusCode: { type: Number, required: true },
  responseTime: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Log', logSchema);
