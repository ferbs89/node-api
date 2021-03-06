const Queue = require('bull');
const redisConfig = require('../config/redis');

const SendMail = require('../app/jobs/SendMail');

const mailQueue = new Queue(SendMail.key, redisConfig);

module.exports = mailQueue;