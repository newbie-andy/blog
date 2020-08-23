const { SuccessModal } = require('./../modal/resModal');
const sql = require('../config/mysql.connect');

const login = (req, res) => {
    let { username, password } = req.body
    sql.exec('select * from user').then(data => {
        res.json(new SuccessModal(data))
    })
}

module.exports = {
    login
}