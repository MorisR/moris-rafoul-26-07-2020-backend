const bcrypt = require("bcrypt")
const {getAndRequireEnvVar} = require("./envCheck")

let hashSaltRounds = getAndRequireEnvVar("HASH_PASSWORD_SALTS_ROUNDS")
hashSaltRounds = parseInt(hashSaltRounds)


module.exports = async (password) => {
    return await bcrypt.hash(password, hashSaltRounds);
}


