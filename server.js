const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { errorHandler } = require('./app/middleware/errorHandler');
const { requestLogger, errorLogger } = require('./app/middleware/logger');
const runSeeders = require('./seeders');
const db = require('./app/models');
const authRouter = require('./app/routes/auth');
const usersRouter = require('./app/routes/users');
const carsRouter = require('./app/routes/cars');
const bikesRouter = require('./app/routes/bikes');
const transactionsRouter = require('./app/routes/transactions');
const testimonialsRouter = require('./app/routes/testimonials');
const cloudinaryRouter = require('./app/routes/cloudinary');
const wishlistRouter = require('./app/routes/wishlist');
const paymentRouter = require('./app/routes/payment');

const { PORT } = process.env;
require('dotenv').config();

const app = express();
app.use(cors({
  origin: '*',
}));

app.use(requestLogger);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', authRouter);
app.use('/', usersRouter);
app.use('/', carsRouter);
app.use('/', bikesRouter);
app.use('/', transactionsRouter);
app.use('/', testimonialsRouter);
app.use('/', cloudinaryRouter);
app.use('/', wishlistRouter);
app.use('/', paymentRouter);

app.use('/seeders', (req, res) => {
  runSeeders();

  res.status(200).json({
    status: 'success',
    message: 'Seeders run successfully',
  });
});

app.use(errorLogger);
app.use(errorHandler);

db.sequelize.authenticate().then(() => {
  try {
    const HOST = process.env.HOST || 'localhost';
    app.listen(PORT, HOST, () => {
      console.log(`Server running on http://${HOST}:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
});
