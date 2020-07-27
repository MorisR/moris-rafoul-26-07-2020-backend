const Joi = require('@hapi/joi');

//input validators
const idSchema = [Joi.number().required(), Joi.string().required()]
const nameSchema = Joi.string().trim().pattern(/^[A-Za-z0-9\s]+$/, "letters, numbers and spaces")
const passwordSchema = Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^0-9^a-z^A-Z]).{6,}$/, "strong password")

//function schemas
const  usersSchema_get = Joi.object({
    userId: idSchema,
    email: Joi.string().email()
})
const  usersSchema_add = Joi.object({
    email: Joi.string().email().required(),
    password: passwordSchema.required(),
    firstName: nameSchema.required(),
    lastName: nameSchema.required()

})
const  usersSchema_update = Joi.object({
    userId: idSchema,
    fieldsToUpdate: Joi.object({
        password: passwordSchema,
        firstName: nameSchema,
        lastName: nameSchema
    })
})
const  usersSchema_delete = Joi.object({
    userId: idSchema
})



//function schemas
const  messagesSchema_getCountOffset = Joi.object({
    userId: idSchema,
    props: Joi.object({
        count: Joi.number().integer().min(0),
        offset: Joi.number().integer().min(0),
    })
})
const  messagesSchema_messageId = Joi.object({
    messageId: idSchema

})
const  messagesSchema_add = Joi.object({
    senderId: idSchema,
    fieldsToUpdate: Joi.object({
        recipientEmail: Joi.string().email().required(),
        subject: Joi.string().required(),
        message: Joi.string()
    })
})







exports.messagesSchema = {
    messageId:  messagesSchema_messageId,
    add:  messagesSchema_add,
    getCountOffset:  messagesSchema_getCountOffset,
}


exports.usersSchema = {
    get:  usersSchema_get,
    add:  usersSchema_add,
    update:  usersSchema_update,
    delete:  usersSchema_delete
}

exports.validateInputs = (args={},schema) =>  Joi.attempt( args, schema);
