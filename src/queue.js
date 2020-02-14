require('dotenv').config();

const Queue = require('./app/libs/Queue');
const SendMail = require('./app/jobs/SendMail');

Queue.process(SendMail.handle);