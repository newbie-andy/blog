var express = require('express');
var router = express.Router();
const {
  login,
  register
} = require('./../controller/user.controller');

// user login
router.post('/login', login);

// user regist
router.post('/register', register)

module.exports = router;
