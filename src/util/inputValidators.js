const Joi = require('@hapi/joi');

//input validators
const idSchema = Joi.alternatives().try(Joi.string(), Joi.number())

const nameSchema = Joi.string().trim()
    .pattern(/^[A-Za-z0-9\s]+$/).message("names can only contain letters, numbers and spaces")

const passwordSchema = Joi.string()
    .min(8)
    .pattern(/(?=.*?[a-z])/).message("\"password\" must include one small letter")
    .pattern(/(?=.*?[A-Z])/).message("\"password\" must include one capital letter")
    .pattern(/(?=.*?[0-9])/).message("\"password\" must include one number")
    .pattern(/(?=.*?[^0-9^a-z^A-Z])/).message("\"password\" must include one symbol")

const emailSchema = Joi.string().email();

//function schemas
const usersSchema_get = Joi.object({
    userId: idSchema,
    email: emailSchema
})
const usersSchema_add = Joi.object({
    email: emailSchema.required(),
    password: passwordSchema.required(),
    firstName: nameSchema.required(),
    lastName: nameSchema.required()

})
const usersSchema_update = Joi.object({
    userId: idSchema.required(),
    fieldsToUpdate: Joi.object({
        password: passwordSchema,
        firstName: nameSchema,
        lastName: nameSchema
    })
})
const usersSchema_delete = Joi.object({
    userId: idSchema.required()
})


//function schemas
const messagesSchema_messageId_count_offset = Joi.object({
    userId: idSchema.required(),
    props: Joi.object({
        count: Joi.number().integer().min(0),
        offset: Joi.number().integer().min(0),
    })
})
const messagesSchema_userId_messageId = Joi.object({
    messageId: idSchema.required(),
    userId: idSchema.required(),

})
const messagesSchema_userId_messageId_boolState = Joi.object({
    messageId: idSchema.required(),
    userId: idSchema.required(),
    state: Joi.boolean()
})
const messagesSchema_add = Joi.object({
    senderId: idSchema.required(),
    recipientEmail: Joi.string().email().required(),
    subject: Joi.string().required(),
    message: Joi.string()

})


exports.messagesSchema = {
    userId_messageId: messagesSchema_userId_messageId,
    userId_messageId_boolState: messagesSchema_userId_messageId_boolState,
    add: messagesSchema_add,
    messageId_count_offset: messagesSchema_messageId_count_offset,
}
exports.usersSchema = {
    get: usersSchema_get,
    add: usersSchema_add,
    update: usersSchema_update,
    delete: usersSchema_delete
}
exports.validateInputs = (args = {}, schema) => Joi.attempt(args, schema);

