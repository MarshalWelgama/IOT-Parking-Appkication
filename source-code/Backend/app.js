// Author: Tim Tattersall

const bodyParser = require('body-parser');
const express = require('express')
const app = express();
const port = 3000;
const cors = require('cors');

// Adding Components

app.use(cors());

app.use(bodyParser.urlencoded({
	extended: false
}));

// parse application/json
app.use(bodyParser.json());

const endpoints = require('./endpoints.js')(app);
const aws = require('./aws.js')(app);

app.listen(port, () => {
	console.log(`Listening on port ${port}!`)

})