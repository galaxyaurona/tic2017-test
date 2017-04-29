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
var request = require('request');
var fs = require('fs');

// upload image to DO server for image recognition
var formData = {
    // Pass data via Streams
    image: fs.createReadStream(__dirname + '/69.jpg'),

}


// for TEST ENCODING /DECODING 60.JPG
/*
fs.readFile('./69.jpg', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    console.log(typeof data)
    b64i = new Buffer(data).toString('base64');
    console.log("base64", b64i.length)


    b64i0 = b64i.substring(0, 500000)
    b64i1 = b64i.substring(500000, 1000000)
    b64i2 = b64i.substring(1000000, b64i.length)
    newb64i = b64i0 + b64i1 + b64i2

    // CHANGE THIS TO 0 1 2 TO UPDATE THE SERVER MANUALLY
    var newFragment = { imageID: "69", packet: 2, data: b64i2 }
    var query = { imageID: "69", packet:2 }
    ImageFragment.findOneAndUpdate(query, newFragment, { upsert: true }, function (err, newImageFragments) {
        if (err) {
            console.log("err", err);

        }

        return console.log("success UPLOADING FRAGMENT")
    });
    var buf = {};
    if (typeof Buffer.from === "function") {
        // Node 5.10+
        buf = Buffer.from(newb64i, 'base64'); // Ta-da
    } else {
        // older Node versions
        buf = new Buffer(newb64i, 'base64'); // Ta-da
    }
    console.log(buf.length)
    fs.writeFileSync("./new69.jpg", buf)


});
*/

// TEST request

var formData = {
    // Pass data via Streams
    image: fs.createReadStream("./69.jpg"),

}
var reqOptions = {
    url: "http://107.170.61.128/detect-goofy-json",
    formData: formData
}
//https://github.com/request/request
// make request
request.post(reqOptions, function optionalCallback(err, httpResponse, body) {
    if (err) {



        return console.error('upload failed:', err);
    }
    console.log('Upload successful!  Server responded with:', body);

});

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
/*
// TEST2 QUERY
var query = {
    imageID: "test2",
}
ImageFragment.find(query, function (err, fragments) {
    console.log(fragments.length)
    var wholeImage = [];
    // map package index to array index
    fragments.forEach(function (current, index, array) {
        var arrayIndex = parseInt(current.packet);
        wholeImage[arrayIndex] = current.data;
    })
    // join the fragment together to create string
    //wholeImageString = wholeImage.join();
    wholeImageString = "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"
    // write to file the base 64
    fs.writeFileSync("./newData.txt", wholeImageString)
    // decode base 64
    var buf = {};
    var options = {
        encoding: "ascii"
    }
    if (typeof Buffer.from === "function") {
        // Node 5.10+
        buf = Buffer.from(wholeImageString, 'base64', options); // Ta-da
    } else {
        // older Node versions
        buf = new Buffer(wholeImageString, 'base64', options); // Ta-da
    }
    console.log("buf", buf.length)
    /// write to file the buffer
    fs.writeFileSync("./newData.jpg", buf)
})
*/
// Morgan will post a log of any requests made to the server.
app.use(morgan('combined'));

// Allow cross origin resource sharing.
app.use(cors());

// Parse all http request bodies as JSON.
app.use(bodyParser.json({ type: '*/*' }));

// Use our project defined routes.
app.get('/', function (req, res) {
    console.log("Body of request: ", req.body);

    res.send('Hello, worlds 2!');
});

app.post('/measurement/measurements', function (req, res) {
    console.log("Body of request:", req.body)
    res.json({ "success": "true" });
});

app.post('/upload-image-fragment', function (req, res) {
    console.log("Body of request:", req.body);

    var query = { 'imageID': req.body.imageID, 'packet': req.body.packet };

    ImageFragment.findOneAndUpdate(query, req.body, { upsert: true }, function (err, newImageFragments) {
        if (err) {
            console.log("err", err);
            return res.json({ "success": false });
        }

        return res.json({ "success": true });
    });


});
// check result
app.post('/check-result', function (req, res) {
    console.log("Body of request: ", req.body);

    var query = { 'imageID': req.body.imageID };
    var total = parseInt(req.body.total);

    ImageFragment.find(query, function (err, fragments) {
        if (err) {
            console.log(err)
        } else {
            console.log("fragments.length: ", fragments.length);
            console.log("req.body.total: ", total);
            if (fragments.length != total) {
                return res.json({ "success": false, "uploadFailure": true });
            } else {
                var wholeImage = [];
                fragments.forEach(function (current, index, array) {
                    var arrayIndex = parseInt(current.packet);
                    wholeImage[arrayIndex] = current.data;
                });

                wholeImageString = wholeImage.join("");

                // DEBUG
                console.log("wholeImageString: ", wholeImageString);
                // END DEBUG

                // for testing purpose
                /*
                wholeImageString = "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"
                */
                var buf = {};

                if (typeof Buffer.from === "function") {
                    // Node 5.10+
                    buf = Buffer.from(wholeImageString, 'base64'); // Ta-da
                } else {
                    // older Node versions
                    buf = new Buffer(wholeImageString, 'base64'); // Ta-da
                }

                /// write to file the buffer
                var filename = __dirname + '/' + Date.now() + '.jpg'
                fs.writeFileSync(filename, buf)
                var formData = {
                    // Pass data via Streams
                    image: fs.createReadStream(filename),

                }
                var reqOptions = {
                    url: "http://107.170.61.128/detect-goofy-json",
                    formData: formData
                }
                //https://github.com/request/request
                // make request
                request.post(reqOptions, function optionalCallback(err, httpResponse, body) {
                    if (err) {

                        res.json({ "success": false });
                        fs.unlinkSync(filename);
                        return console.error('upload failed:', err);
                    }
                    console.log('Upload successful!  Server responded with:', body);
                    t
                    res.json(body)
                    fs.unlinkSync(filename);
                });

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
