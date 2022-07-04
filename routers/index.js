const express = require('express');
const webRouter = require('./web');
const apiRouter = require('./api');

const masterRouter = express.Router();

masterRouter.use('/', webRouter);
masterRouter.use('/api', apiRouter);

module.exports = masterRouter;