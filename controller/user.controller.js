const sql = require('../config/mysql.connect');

const login = (req, res) => {
    let { username, password } = req.body
    sql.exec('select * from user').then(data => {
        res.json(data)
    }).catch(err => {
        console.log(err)
    })
}

module.exports = {
    login
}