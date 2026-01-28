const Claim = require('../models/Claim');
const Deal = require('../models/Deal');
const { AppError } = require('../middlewares/errorHandler');

// @desc    Claim a deal
// @route   POST /api/v1/claims
// @access  Private
const claimDeal = async (req, res, next) => {
    try {
        const { dealId } = req.body;
        const userId = req.user._id;

        // 1. Check if deal exists
        const deal = await Deal.findById(dealId);
        if (!deal) {
            return next(new AppError('Deal not found', 404));
        }

        // 2. Check if deal is Locked and User is Verified
        if (deal.isLocked && !req.user.isVerified) {
            return next(new AppError('This deal is reserved for verified startup founders.', 403));
        }

        // 3. Check if already claimed
        const existingClaim = await Claim.findOne({ user: userId, deal: dealId });
        if (existingClaim) {
            return next(new AppError('You have already claimed this deal.', 400));
        }

        // 4. Create Claim
        const claim = await Claim.create({
            user: userId,
            deal: dealId,
            status: 'approved', // Auto-approve for demo
        });

        res.status(201).json({
            success: true,
            claim,
            dealCode: deal.discountCode, // Reveal code now
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get logged in user claims
// @route   GET /api/v1/claims
// @access  Private
const getMyClaims = async (req, res, next) => {
    try {
        const claims = await Claim.find({ user: req.user._id }).populate('deal', 'title companyName imageUrl discountCode');
        res.json(claims);
    } catch (error) {
        next(error);
    }
};

module.exports = { claimDeal, getMyClaims };
