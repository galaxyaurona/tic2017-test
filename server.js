// Node modules.
const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const cors = require('cors');

// Create our express application.
const app = express();

// Morgan will post a log of any requests made to the server.
app.use(morgan('combined'));

// Allow cross origin resource sharing.
app.use(cors());

// Parse all http request bodies as JSON.
app.use(bodyParser.json({ type: '*/*' }));

// Use our project defined routes.
app.get('/', function(req, res) {
    res.send('Hello, worlds 2!');
});

app.post('/measurement/measurements', function(req, res) {
    console.log("Body of request:",req.body)
    res.json({"success":"true"});
});

// Create the server.
const defaultPort = 8081;
const serverPort = process.env.PORT || defaultPort;
const server = http.createServer(app);
server.listen(serverPort);
console.log('Server listening on: ', serverPort);
