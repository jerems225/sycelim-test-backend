require('dotenv').config();
const { PORT } = process.env;
const logger = require('./config/logger');

const app = require('./app');

app.listen(PORT||3000, '0.0.0.0', () => {
    logger.info(`🚀 Server running on PORT ${PORT}`);
});