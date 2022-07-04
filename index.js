const express = require('express');
const bodyParser = require('body-parser')
const { HOST, PORT, ENV } = require('./config/server');
const masterRouter = require('./routers');

const app = express();

app.use(bodyParser.json());
app.use(masterRouter);

app.listen(PORT, () => {
    process.stdout.write(`Server started at ${HOST}:${PORT} (${ENV})\n`);
});