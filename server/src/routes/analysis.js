const express = require('express');
const { analyzeWebsite, getAnalysis, getHistory } = require('../controllers/analysisController');
const { optional, protect } = require('../middleware/auth');
const { analysisLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.post('/', analysisLimiter, optional, analyzeWebsite);
router.get('/history', protect, getHistory);
router.get('/:id', getAnalysis);

module.exports = router;