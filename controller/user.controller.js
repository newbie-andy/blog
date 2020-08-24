const i18n = require('./../lang/local');
const { SuccessModal, ErrorModal } = require('./../modal/resModal');
const { crypto } = require('./../utils/index');
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
        password = crypto(password);
        let data = await SQL.exec('INSERT INTO user SET ?', {telephone, password})
        
        if (data.affectedRows && data.insertId) {
            return res.json(new SuccessModal())
        }
    }
}

// user login
async function login(req, res) {
    let { telephone, password } = req.body
    let data = await SQL.exec('SELECT telephone, username, nickname, is_admin, last_login_time FROM user WHERE `telephone` = ? AND `password` = ? LIMIT 1', [telephone, crypto(password)])
    if (data.length) {
        let _token = crypto(telephone + process.env.REDIS_SECRET_KEY)
        RS.set(_token, data.insertId)
        return res.json({
            data: data,
            token: _token
        })
    } else {
        return res.json(new ErrorModal(i18n.LoginDefeated))
    }
}

async function logout() {
    
}

async function getUserByToken(token) {
    let _id = RS.get(token)
    let data = false
    if (_id) {
        await SQL.exec('SELECT id, username, is_admin, last_login_time FROM user WHERE `id` = ? limit 1', _id)
    }
    return data
}

const getUserInfo = () => {

}
  
module.exports = {
    login,
    register
}