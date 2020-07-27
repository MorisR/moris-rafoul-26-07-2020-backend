const {users} = require("../postgres")
const Joi = require('@hapi/joi');

//input validators
const idSchema = [Joi.number().required(), Joi.string().required()]
const nameSchema = Joi.string().trim().pattern(/^[A-Za-z0-9\s]+$/, "letters, numbers and spaces")
const passwordSchema = Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^0-9^a-z^A-Z]).{6,}$/, "strong password")
const getSchema = Joi.object({
    userId: idSchema,
    email: Joi.string().email()
})
const addSchema = Joi.object({
    email: Joi.string().email().required(),
    password: passwordSchema.required(),
    firstName: nameSchema.required(),
    lastName: nameSchema.required()

})
const updateSchema = Joi.object({
    userId: idSchema,
    fieldsToUpdate: Joi.object({
        password: passwordSchema,
        firstName: nameSchema,
        lastName: nameSchema
    })
})
const deleteSchema = Joi.object({
    userId: idSchema
})


exports.get = async ({userId, email} = {}) => {

    Joi.attempt( {userId, email}, getSchema)

    if (!email && !userId)
        throw new Error("user id or email address must be provided")

    return await users.get({userId, email})
}
exports.update = async (userId, fieldsToUpdate) => {

    Joi.attempt( {userId, fieldsToUpdate}, updateSchema)

    return await users.update(userId, fieldsToUpdate)
}
exports.add = async ({email, password, firstName, lastName} = {}) => {

    Joi.attempt( {email, password, firstName, lastName}, addSchema)

    return await users.add({email, password, firstName, lastName})
}
exports.delete = async (userId) => {

    Joi.attempt({userId}, deleteSchema)

    return await users.delete(userId)

}


