var express = require('express');
var router = express.Router();
const { isLoginCheck } = require('./../middlewares/user.middleware')
const {
  login,
  register,
  logout
} = require('./../controller/user.controller');

// 用户登录注册操作
router.post('/login', login);
router.post('/register', register);
router.post('/logout', isLoginCheck, logout)


module.exports = router;
