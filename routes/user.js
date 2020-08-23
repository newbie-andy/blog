var express = require('express');
var router = express.Router();
const {
  login
} = require('./../controller/user.controller');

// user login
router.post('/login', login);

// 

module.exports = router;
