const CryptoJS  = require('crypto-js');
const Session = require('express-session');

const crypto = (data) => {
    return CryptoJS.AES.encrypt(data, process.env.PASSWORD_SECRET_KEY).toString()
}

const session = () => {
    return Session({
        
    })
}

module.exports = {
    crypto,

}