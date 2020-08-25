const i18n = require('./../lang/local');
const { SuccessModal, ErrorModal } = require('./../modal/resModal');
const { cryptoPWD, cryptoToken, getBearTokenValue } = require('./../utils/index');
const SQL = require('../config/mysql.connect');
const RS = require('../config/redis.connect');

// user register
async function register(req, res) {
    let { telephone, password, repassword } = req.body
    // is exist user ?
    let data = await SQL.exec('SELECT id FROM user where `telephone` = ? limit 1', telephone)
    if (data.length) {
        return res.json(new ErrorModal(i18n.HasRegister))
    }
    if (String(password) && String(repassword) && password === repassword) {
        password = cryptoPWD(password);
        let data = await SQL.exec('INSERT INTO user SET ?', {telephone, password})
        
        if (data.affectedRows && data.insertId) {
            return res.json(new SuccessModal())
        }
    }
}

// user login
async function login(req, res) {
    let { telephone, password } = req.body
    let data = await SQL.exec('SELECT telephone, username, nickname, is_admin, last_login_time FROM user WHERE `telephone` = ? AND `password` = ? LIMIT 1', [telephone, cryptoPWD(password)])
    if (data.length) {
        let _token = cryptoToken(telephone)
        RS.set(_token, data.insertId)
        return res.json({
            data: data,
            token: _token
        })
    } else {
        return res.json(new ErrorModal(i18n.LoginDefeated))
    }
}

async function logout(req, res) {
    // 删除redis中的记录即可  
    let _token = getBearTokenValue(req.headers.authorization)
    RS.del(_token)
    return res.json(new SuccessModal(i18n.LogoutSuccess))
}

async function getUserByToken(token) {
    let _id = RS.get(token)
    let data = {}
    if (_id) {
        data = await SQL.exec('SELECT id, username, is_admin, last_login_time FROM user WHERE `id` = ? limit 1', _id)
    }
    return data
}

async function getUserInfo(req, res) {
    let _token = getBearTokenValue(req.headers.authorization)
    let data = await getUserByToken(_token)

    return res.json(new SuccessModal(data))
}
  
module.exports = {
    login,
    register,
    logout,
    getUserInfo
}