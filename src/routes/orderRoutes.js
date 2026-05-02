const express = require('express');
const { createOrder, getOrders } = require('../controllers/orderController');
const auth = require('../middleware/auth');
const router = express.Router();

router.use(auth);
router.post('/', createOrder);
router.get('/', getOrders);

module.exports = router;
