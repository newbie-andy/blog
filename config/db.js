require('dotenv-flow').config();

// config mysql
const MYSQL_CONF = {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    connectionLimit: process.env.DATABASE_CON_LIMIT
}

// config redis
const REDIS_CONF = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASS
}

// output
module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}