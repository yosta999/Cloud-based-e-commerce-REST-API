const Log = require('../models/Log');
const { extractFeatures } = require('../services/featureExtraction');
const { analyzeThreat } = require('../nn/threatModel');

exports.getThreatReport = async (req, res, next) => {
  try {
    const logs = await Log.find().sort({ timestamp: -1 }).limit(1000);
    const features = extractFeatures(logs);
    const result = analyzeThreat(features);
    
    res.json({
      verdict: result.score > 0.5 ? "suspicious" : "normal",
      score: result.score,
      features
    });
  } catch (error) {
    next(error);
  }
};
