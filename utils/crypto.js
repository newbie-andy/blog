const CryptoJS  = require('crypto-js');

module.exports = (data) => {
    return CryptoJS.AES.encrypt(data, process.env.PASSWORD_SECRET_KEY).toString()
}