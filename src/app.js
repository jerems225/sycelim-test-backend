const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger.json');
const errorMiddleware = require('./middlewares/error.middleware');
const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const propertyRoutes = require('./routes/property.routes');
const pCategoryRoutes = require('./routes/p.category.routes');
const bookingRoutes = require('./routes/booking.routes');

app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public/cover', express.static(path.join(__dirname, 'cover')));

app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

app.use('/api/v1/', authRoutes);
app.use('/api/v1/', userRoutes);
app.use('/api/v1/', propertyRoutes);
app.use('/api/v1/', pCategoryRoutes);
app.use('/api/v1/', bookingRoutes);

app.use(errorMiddleware);

module.exports = app;