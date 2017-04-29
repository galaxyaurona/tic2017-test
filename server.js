// Node modules.
var bodyParser = require('body-parser');
var express = require('express');
var http = require('http');
var morgan = require('morgan');
var cors = require('cors');
var mongoose = require("mongoose");
var ImageFragment = require("./models/ImageFragment")
// Create our express application.
var app = express();

// CONNECT TO DATABASE
mongoose.connect("mongodb://admin:admin@ds123331.mlab.com:23331/tic2017", function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Connected to the database');
        //BlockCypherService.queryMissedHookResult();
    }
})


// Morgan will post a log of any requests made to the server.
app.use(morgan('combined'));

// Allow cross origin resource sharing.
app.use(cors());

// Parse all http request bodies as JSON.
app.use(bodyParser.json({ type: '*/*' }));

// Use our project defined routes.
app.get('/', function (req, res) {
    res.send('Hello, worlds 2!');
});

app.post('/measurement/measurements', function (req, res) {
    console.log("Body of request:", req.body)
    res.json({ "success": "true" });
});

app.post('/upload-image-fragment', function (req, res) {
    console.log(req.body);

    var query = { 'imageID': req.body.imageID, 'packet': req.body.packet };

    ImageFragment.findOneAndUpdate(query, req.body, { upsert: true }, function (err, newImageFragments) {
        if (err) {
            console.log("err", err);
            return res.json({ "success": false });
        }

        return res.json({ "success": true });
    });


});
app.post('/check-result', function (req, res) {

    var query = { 'imageID': req.body.imageID };
    var total = parseInt(req.body.total);

    ImageFragment.find(query, function (err, fragments) {
        if (err) {
            console.log(err)
        } else {
            if (fragments.length != total) {
                return res.json({ "success": false, "uploadFailure": true });
            } else {
                fragments.forEach(function(current,index,array) {
                    console.log(current)
                })
                res.json({ "success": true });
            }
        }

    })

});


// Create the server.
var defaultPort = 8081;
var serverPort = process.env.PORT || defaultPort;
var server = http.createServer(app);
server.listen(serverPort);
console.log('Server listening on: ', serverPort);
