const {query: {users}} = require("../postgres")
const {validateInputs, usersSchema} = require("../../util/inputValidators");


exports.get = async ({userId, email} = {}) => {

    validateInputs({userId, email}, usersSchema.get)

    if (!email && !userId)
        throw new Error("user id or email address must be provided")

    const userData = await users.get({userId, email})
    return filterUserData(userData)
}
exports.update = async (userId, fieldsToUpdate) => {

    validateInputs({userId, fieldsToUpdate}, usersSchema.update)

    const userData = await users.update(userId, fieldsToUpdate)
    return filterUserData(userData)

}
exports.add = async ({email, password, firstName, lastName} = {}) => {

    validateInputs({email, password, firstName, lastName}, usersSchema.add)

    const userData = await users.add({email, password, firstName, lastName})
    return filterUserData(userData)
}
exports.delete = async (userId) => {

    validateInputs({userId}, usersSchema.delete)
    const userData = await users.delete(userId)
    return filterUserData(userData)
}


exports.validateCredentials = async (email, password) => {
    const userData = await users.get({email})
    if (!userData)
        throw new Error("user not found!")

    if (userData.password !== password)
        throw new Error("incorrect password!")

    return filterUserData(userData)
}
exports.validateRegisterCredentials = async ({email, password, firstName, lastName}) => {
    const userData = await users.get({email})

    if (userData)
        throw new Error("email already in use")

    validateInputs({email, password, firstName, lastName}, usersSchema.add)

}

function filterUserData(userData) {

    return {
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        id: userData.id,

    }

}