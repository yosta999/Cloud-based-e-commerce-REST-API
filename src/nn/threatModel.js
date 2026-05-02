const brain = require('brain.js');

const net = new brain.NeuralNetwork({ hiddenLayers: [3] });

const trainingData = [
  { input: { failedLogins: 0.0, requestRate: 0.1, unknownRoutes: 0.0 }, output: { suspicious: 0 } },
  { input: { failedLogins: 0.1, requestRate: 0.2, unknownRoutes: 0.1 }, output: { suspicious: 0 } },
  { input: { failedLogins: 0.0, requestRate: 0.5, unknownRoutes: 0.0 }, output: { suspicious: 0 } },
  { input: { failedLogins: 0.8, requestRate: 0.9, unknownRoutes: 0.2 }, output: { suspicious: 1 } },
  { input: { failedLogins: 0.1, requestRate: 0.8, unknownRoutes: 0.9 }, output: { suspicious: 1 } },
  { input: { failedLogins: 0.9, requestRate: 0.1, unknownRoutes: 0.1 }, output: { suspicious: 1 } },
  { input: { failedLogins: 1.0, requestRate: 1.0, unknownRoutes: 1.0 }, output: { suspicious: 1 } }
];

net.train(trainingData, { iterations: 2000, errorThresh: 0.01 });

exports.analyzeThreat = (features) => {
  const result = net.run(features);
  return { score: result.suspicious || 0 };
};
