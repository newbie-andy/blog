var express = require('express');
var router = express.Router();
const { isLoginCheck } = require('./../middlewares/user.middleware')
const { 
    getSingleBlog,
    getBlogList
} = require('./../controller/blog.controller')

// 用户登录注册操作
router.get('/getSingleBlog', getSingleBlog);
router.get('/getBlogList', getBlogList);


module.exports = router;
