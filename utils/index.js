const CryptoJS  = require('crypto-js');

const crypto = (data) => {
    return CryptoJS.SHA1(CryptoJS.MD5(data, process.env.PASSWORD_SECRET_KEY)).toString()
}

module.exports = {
    crypto
}