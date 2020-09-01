const mysql = require('mysql');
const { MYSQL_CONF } = require('./db');

class MysqlClient {
    constructor() {
        this.pool = mysql.createPool(MYSQL_CONF);
        // 监听获取完成
        this.pool.on('acquire', function (connection) {
            console.log('> 连接获取成功(threadId：%d)', connection.threadId)
        })

        // 监听创建了新的连接
        this.pool.on('connection', function (connection) {
            console.log('> 创建了新的连接(threadId：%d)', connection.threadId)
        })

        // 监听排队状态中
        this.pool.on('enqueue', function () {
            console.log('> 正在等待新的连接...')
        })

        // 监听连接被释放
        this.pool.on('release', function (connection) {
            console.log('> 当前连接被释放了(threadId：%d)', connection.threadId)
        })
    }

    exec() {
        let params = arguments
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (err) {
                    throw Error('mysql connect error', err)
                }
                let query = connection.query(...params, (error, results, fields) => {
                    if (err) {
                        reject(err)
                        return
                    }
                    resolve(results)
                    connection.release();
                })
                // record sql
                console.log(query.sql)
            })
        })
    }
}

module.exports = new MysqlClient()

