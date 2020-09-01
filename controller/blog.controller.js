const i18n = require('./../lang/local');
const { SuccessModal, ErrorModal } = require('./../modal/resModal');
const SQL = require('../config/mysql.connect');
const RS = require('../config/redis.connect');

// 获取单个博客
async function getSingleBlog(req, res, next) {
    let { id } = req.query
    if (id) {
        let blog = await SQL.exec('SELECT title, content, user_id, c_time FROM blog where id = ? limit 1', id)
        let user_id = blog && blog[0].user_id, user = {}
        if (user_id) {
            user = await SQL.exec('SELECT username, nickname, sex FROM user where id = ?', user_id)
        }
        return res.json(new SuccessModal({
            blog: blog[0],
            user: user[0]
        }))
    }
}

// 获取数据库中所有用户的博客并进行分页处理
async function getBlogList(req, res, next) {
    let { page, limit } = req.query
    page = parseInt(page) ? parseInt(page) : 1
    limit = parseInt(limit) ? parseInt(limit) : 10
    let start = (page - 1) * limit

    let blogs = await SQL.exec('SELECT blog.title, blog.content, blog.c_time, blog.user_id, user.username, user.nickname FROM blog LEFT JOIN user ON blog.user_id = user.id LIMIT ?, ?', [start, limit])
    if (blogs.length) {
        return res.json(new SuccessModal(blogs))
    } else {
        return res.json(new SuccessModal([]))
    }
}

module.exports = {
    getSingleBlog,
    getBlogList
}