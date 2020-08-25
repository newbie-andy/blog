const redis = require('redis');
const { REDIS_CONF } = require('./db');

class RS {
    constructor () {
        this.client = redis.createClient(REDIS_CONF)
        this.client.on("error", (error) => {
            console.error(error);
        });
    }

    get (key) {
        return this.client.get(key)
    }

    set (key, value) {
        this.client.set(key, String(value))
        this.client.expire(key, 60 * 60 * 24 * process.env.TIME)
    }

    exists (key) {
        return this.client.exists(key)
    }

    del (key) {
        if (this.exists(key)) {
            this.client.del(key)
        }
    }
}

module.exports = new RS()