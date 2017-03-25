var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res){
  console.log('index.js hit');
  res.sendFile(path.resolve('/server/public/index.html'));
});

module.exports = router;
