exports.extractFeatures = (logs) => {
  if (!logs || logs.length === 0) {
    return { failedLogins: 0, requestRate: 0, unknownRoutes: 0 };
  }

  let failedLogins = 0;
  let unknownRoutes = 0;
  
  const timeSpanMs = logs[0].timestamp - logs[logs.length - 1].timestamp;
  const requestRate = timeSpanMs > 0 ? logs.length / (timeSpanMs / 1000) : logs.length;

  logs.forEach(log => {
    if (log.statusCode === 401) failedLogins++;
    if (log.statusCode === 404) unknownRoutes++;
  });

  const maxExpectedRequests = 100;
  const maxExpectedFailures = 20;
  const maxExpectedUnknowns = 20;

  return {
    failedLogins: Math.min(failedLogins / maxExpectedFailures, 1),
    requestRate: Math.min(requestRate / maxExpectedRequests, 1),
    unknownRoutes: Math.min(unknownRoutes / maxExpectedUnknowns, 1)
  };
};
