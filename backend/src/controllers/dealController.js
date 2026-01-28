const Deal = require('../models/Deal');
const { AppError } = require('../middlewares/errorHandler');

// @desc    Fetch all deals
// @route   GET /api/v1/deals
// @access  Public
const getDeals = async (req, res, next) => {
    try {
        const pageSize = 10;
        const page = Number(req.query.pageNumber) || 1;

        const keyword = req.query.keyword
            ? {
                title: {
                    $regex: req.query.keyword,
                    $options: 'i',
                },
            }
            : {};

        const category = req.query.category
            ? {
                category: {
                    $regex: req.query.category,
                    $options: 'i',
                },
            }
            : {};

        // Filter by locked status if provided
        const isLocked = req.query.isLocked
            ? { isLocked: req.query.isLocked === 'true' }
            : {};

        const count = await Deal.countDocuments({ ...keyword, ...category, ...isLocked });
        const deals = await Deal.find({ ...keyword, ...category, ...isLocked })
            .limit(pageSize)
            .skip(pageSize * (page - 1));

        res.json({ deals, page, pages: Math.ceil(count / pageSize) });
    } catch (error) {
        next(error);
    }
};

// @desc    Fetch single deal
// @route   GET /api/v1/deals/:id
// @access  Public
const getDealById = async (req, res, next) => {
    try {
        const deal = await Deal.findById(req.params.id);

        if (deal) {
            res.json(deal);
        } else {
            next(new AppError('Deal not found', 404));
        }
    } catch (error) {
        next(error);
    }
};

module.exports = { getDeals, getDealById };
