var express = require('express');
var app = express();
app.use('/', express.static(__dirname + '/../app'));
app.use('/lib', express.static(__dirname + '/../node_modules'));
app.listen(8080, function() {
    console.log('Front listening on port 8080!');
});