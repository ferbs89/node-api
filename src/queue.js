require('dotenv').config();

const Queue = require('./lib/Queue');
const SendMail = require('./app/jobs/SendMail');

Queue.process(SendMail.handle);