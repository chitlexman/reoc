var express = require('express');
var router = express.Router();
var Command = require('../models/command').Command;

var logs = [];

router.get('/', function(req, res, next) {
  res.json(logs);
});

router.post('/', function(req, res, next) {
  if (req.body.command) {

    var command = new Command(req.body.command, req.body.comment);
    
    logs.push(command);
    res.json(command);

  } else {
    res.status(400);
  }
});

module.exports = router;
