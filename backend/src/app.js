const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { errorHandler } = require('./middlewares/errorHandler');

// Routes
const authRoutes = require('./routes/authRoutes');
const dealRoutes = require('./routes/dealRoutes');
const claimRoutes = require('./routes/claimRoutes');

const app = express();

// Security Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
app.use('/api', limiter);

// Register Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/deals', dealRoutes);
app.use('/api/v1/claims', claimRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Error Handling
app.use(errorHandler);

module.exports = app;
