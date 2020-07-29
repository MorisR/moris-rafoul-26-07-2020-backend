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
    await users.delete(userId)

}


exports.validateCredentials = async (email, password, passwordComparer = (pass1, pass2) => pass1 === pass2) => {

    validateInputs({ email}, usersSchema.get)

    const userData = await users.get({email})
    if (!userData)
        throw new Error("user not found!")


    if (!await passwordComparer(password, userData.password))
        throw new Error("incorrect password!")

}
exports.validateRegisterCredentials = async ({email, password, firstName, lastName}) => {


    validateInputs({email, password, firstName, lastName}, usersSchema.add)

    const userData = await users.get({email})

    if (userData)
        throw new Error("email already in use")


}

function filterUserData(userData) {

    return {
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        id: userData.id,

    }

}