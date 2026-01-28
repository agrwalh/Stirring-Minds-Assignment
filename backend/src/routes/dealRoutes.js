const express = require('express');
const { getDeals, getDealById } = require('../controllers/dealController');

const router = express.Router();

router.route('/').get(getDeals);
router.route('/:id').get(getDealById);

module.exports = router;
