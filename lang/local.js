const en = require('./en');
const zh = require('./zh');

const local = {en, zh}
module.exports = local[process.env.LOCAL_LANGUAGE]