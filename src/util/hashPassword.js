const bcrypt = require("bcrypt")
const {getAndRequireEnvVar} = require("./envCheck")

let hashSaltRounds = getAndRequireEnvVar("HASH_PASSWORD_SALTS_ROUNDS")
hashSaltRounds = parseInt(hashSaltRounds)


exports.hash = async (password) => {
    return await bcrypt.hash(password, hashSaltRounds);
}


exports.compare = async (password,hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}
