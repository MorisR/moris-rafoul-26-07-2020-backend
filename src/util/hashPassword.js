const bcrypt = require("bcrypt")

let hashSaltRounds = process.env.HASH_PASSWORD_SOLTS_ROUNDS

if (!hashSaltRounds)
    throw new Error("SESSION_AGE_SECONDS must be set as an environment variable")

hashSaltRounds = parseInt(hashSaltRounds)


module.exports = async (password) => {
    return await bcrypt.hash(password, hashSaltRounds);
}


