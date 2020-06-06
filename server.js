var port = process.env.PORT || 8020;
var express = require('express');

app = module.exports.app = express();
const router = require('./app/router');

router(app);

var http = require('http').createServer(app);

http.listen(port);
console.log('The server running on port: ' + port)
