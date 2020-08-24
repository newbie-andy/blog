const i18n = require('./../lang/local');
const { SuccessModal, ErrorModal } = require('./../modal/resModal');
const { crypto, session } = require('./../utils/index');
const SQL = require('../config/mysql.connect');

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
        if (data.affectedRows) {
            // 处理用户的登录凭证信息

        }
    }
}

// user login
const login = (req, res) => {
    let { telephone, password } = req.body

    SQL.exec('SELECT id, username, is_admin, last_login_time FROM user WHERE `telephone` = ? and `password` = ? limit 1', [telephone, password]).then(data => {
        return res.json(new SuccessModal(data))
    })
}

const getUserInfo = () => {

}
  
module.exports = {
    login,
    register
}