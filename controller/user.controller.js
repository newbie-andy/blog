const session = require('express-session');
const i18n = require('./../lang/local');
const { SuccessModal, ErrorModal } = require('./../modal/resModal');
const crypto = require('./../utils/crypto');
const SQL = require('../config/mysql.connect');

// user register
async function register(req, res) {
    let { telephone, password, repassword } = req.body
    // is exist user ?
    let data = await SQL.exec('SELECT id FROM user where `telephone` = ? limit 1', telephone)
    if (data) {
        res.json(new ErrorModal(i18n.HasRegister))
    }
    if (String(password) && String(repassword) && password === repassword) {
        password = crypto(password);
        SQL.exec('INSERT INTO user SET ?', {telephone, password}).then(data => {
            res.json(new SuccessModal(data.insertId))
        })
    }
}

// user login
const login = (req, res) => {
    let { telephone, password } = req.body

    SQL.exec('SELECT id, username, is_admin, last_login_time FROM user WHERE `telephone` = ? and `password` = ? limit 1', [telephone, password]).then(data => {
        res.json(new SuccessModal(data))
    })
}

const getUserInfo = () => {

}
  
module.exports = {
    login,
    register
}