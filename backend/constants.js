const PORT = process.env.PORT || 8080;
const BROKER_MQ_DOMAIN = process.env.RABBIT_MQ_DOMAIN || 'localhost:5672';

module.exports = {
    PORT,
    BROKER_MQ_DOMAIN
};