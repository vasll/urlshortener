const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const apiRoutes = require('./routes/api');
const frontendRoutes = require('./routes/frontend');
const bodyParser = require('body-parser');
require('dotenv').config();

// Express app
const app = express();

// Set up CORS, static file serving
app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));
app.use(bodyParser.urlencoded({ extended: true }));

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
