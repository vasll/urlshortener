const express = require('express');
const cors = require('cors');
const { inspect } = require('util');
const mongoose = require('mongoose')
const apiRoutes = require('./routes/api');
const frontendRoutes = require('./routes/frontend');
const bodyParser = require('body-parser');
require('dotenv').config();

// Express app
const app = express();

// Set up middleware
app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Set up custom middleware
const loggerMiddleware = (req, res, next) => {
	console.log(
	`[${new Date().toLocaleString()}] ${req.method} ${req.url} FROM ${req.ip}\n` +
	` req.body: ${inspect(req.body)}\n` +
	` req.params: ${inspect(req.params)}` 
	);
	next();
};
app.use(loggerMiddleware)

// Set up project routes
app.use('/api', apiRoutes);
app.use('/', frontendRoutes);

// Connect to mongodb database
mongoose.connect(process.env.MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true });

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => { 
	console.log(`Listening on port ${port}`);
});
