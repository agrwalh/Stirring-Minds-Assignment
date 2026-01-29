const Claim = require('../models/Claim');
const Deal = require('../models/Deal');
const { AppError } = require('../middlewares/errorHandler');

const claimDeal = async (req, res, next) => {
    try {
        const { dealId } = req.body;
        const userId = req.user._id;

        const deal = await Deal.findById(dealId);
        if (!deal) {
            return next(new AppError('Deal not found', 404));
        }

        if (deal.isLocked && !req.user.isVerified) {
            return next(new AppError('This deal is reserved for verified startup founders.', 403));
        }

        const existingClaim = await Claim.findOne({ user: userId, deal: dealId });
        if (existingClaim) {
            return next(new AppError('You have already claimed this deal.', 400));
        }

        const claim = await Claim.create({
            user: userId,
            deal: dealId,
            status: 'approved',
        });

        res.status(201).json({
            success: true,
            claim,
            dealCode: deal.discountCode,
        });
    } catch (error) {
        next(error);
    }
};

const getMyClaims = async (req, res, next) => {
    try {
        const claims = await Claim.find({ user: req.user._id }).populate('deal', 'title companyName imageUrl discountCode');
        res.json(claims);
    } catch (error) {
        next(error);
    }
};

module.exports = { claimDeal, getMyClaims };
