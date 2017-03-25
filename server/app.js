var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var index = require('./routes/index.js');
var task = require('./routes/task.js');
var port = 5000;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));


app.use('/', index);

app.use('/task', task);


app.listen(port, function(){
  console.log('listening on port: ', port);
});
