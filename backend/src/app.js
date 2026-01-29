const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { errorHandler } = require('./middlewares/errorHandler');


const authRoutes = require('./routes/authRoutes');
const dealRoutes = require('./routes/dealRoutes');
const claimRoutes = require('./routes/claimRoutes');

const app = express();


app.use(helmet());
app.use(cors());
app.use(express.json());


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
app.use('/api', limiter);


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/deals', dealRoutes);
app.use('/api/v1/claims', claimRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});


app.use(errorHandler);

module.exports = app;
