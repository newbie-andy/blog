const CryptoJS  = require('crypto-js');

const cryptoPWD = (data) => {
    return CryptoJS.SHA1(CryptoJS.MD5(data, process.env.PASSWORD_SECRET_KEY)).toString()
}

const cryptoToken = (data) => {
    return CryptoJS.AES.encrypt(data, process.env.REDIS_SECRET_KEY).toString()
}

const getBearTokenValue = (token) => {
    return token.split(' ')[1]
}

module.exports = {
    cryptoPWD,
    cryptoToken,
    getBearTokenValue
}