const express = require('express');
const { getThreatReport } = require('../controllers/threatController');
const router = express.Router();

router.get('/report', getThreatReport);

module.exports = router;
