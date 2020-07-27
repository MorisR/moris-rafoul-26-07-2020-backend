const {query: {users}} = require("../postgres")
const {validateInputs,usersSchema} = require("../../util/inputValidators");



exports.get = async ({userId, email} = {}) => {

    validateInputs( {userId, email}, usersSchema.get)

    if (!email && !userId)
        throw new Error("user id or email address must be provided")

    return await users.get({userId, email})
}
exports.update = async (userId, fieldsToUpdate) => {

    validateInputs( {userId, fieldsToUpdate}, usersSchema.update)
    return await users.update(userId, fieldsToUpdate)
}
exports.add = async ({email, password, firstName, lastName} = {}) => {

    validateInputs( {email, password, firstName, lastName}, usersSchema.add)
    return await users.add({email, password, firstName, lastName})
}
exports.delete = async (userId) => {

    validateInputs( {userId}, usersSchema.delete)
    return await users.delete(userId)

}


