const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { AppError } = require('../middlewares/errorHandler');

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return next(new AppError('User already exists', 400));
        }

        // Business Logic: Auto-verify if email is from a "startup" domain (mock logic)
        const isVerified = email.endsWith('@startup.com') || email.endsWith('@innovate.io');

        const user = await User.create({
            name,
            email,
            password,
            isVerified,
        });

        if (user) {
            res.status(201).json({
                success: true,
                _id: user._id,
                name: user.name,
                email: user.email,
                isVerified: user.isVerified,
                token: generateToken(user._id),
            });
        } else {
            return next(new AppError('Invalid user data', 400));
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Auth user & get token
// @route   POST /api/v1/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                success: true,
                _id: user._id,
                name: user.name,
                email: user.email,
                isVerified: user.isVerified,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            return next(new AppError('Invalid email or password', 401));
        }
    } catch (error) {
        next(error);
    }
};

module.exports = { registerUser, loginUser };
