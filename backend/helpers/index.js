const crypto = require('crypto')
function randomValueHex (len) {
    return crypto.randomBytes(Math.ceil(len/2))
        .toString('hex')
        .slice(0,len);
}

module.exports = {
    randomValueHex
}
