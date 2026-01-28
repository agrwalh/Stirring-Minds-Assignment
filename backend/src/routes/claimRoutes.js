const express = require('express');
const { claimDeal, getMyClaims } = require('../controllers/claimController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/').post(protect, claimDeal).get(protect, getMyClaims);

module.exports = router;
