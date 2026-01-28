const jwt = require('jsonwebtoken');
const { AppError } = require('./errorHandler');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');

            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.error(error);
            next(new AppError('Not authorized, token failed', 401));
        }
    }

    if (!token) {
        next(new AppError('Not authorized, no token', 401));
    }
};

const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        next(new AppError('Not authorized as an admin', 403));
    }
};

module.exports = { protect, admin };
