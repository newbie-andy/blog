const i18n = require('./../lang/local');
const { SuccessModal, ErrorModal } = require('./../modal/resModal');
const RS = require('../config/redis.connect');
const { getBearTokenValue } = require('./../utils/index');

const isLoginCheck = (req, res, next) => {
    let _token = getBearTokenValue(req.headers.authorization)
    if (RS.exists(_token)) {
        next()
    } else {
        return res.json(new ErrorModal(i18n.NotLogin))
    }
}
module.exports = {
    isLoginCheck
}