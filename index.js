const express = require('express');
const cors = require('cors');
const app = express();
const apiRoutes = require('./routes/api');
const frontendRoutes = require('./routes/frontend');
require('dotenv').config();

// Set up CORS, static file serving
app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));

// Set up project routes
app.use('/api', apiRoutes);
app.use('/', frontendRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => { 
	console.log(`Listening on port ${port}`);
});
