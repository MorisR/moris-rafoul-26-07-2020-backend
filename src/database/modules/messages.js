const {query: {messages}} = require("../postgres")
const {validateInputs,messagesSchema} = require("../../util/inputValidators");



exports.getReceived = async (userId, {count, offset} = {}) => {

    validateInputs( {userId, props: {count, offset}}, messagesSchema.getCountOffset)
    return await messages.getReceived(userId, {count, offset});
}

exports.getSent = async (userId, {count, offset} = {}) => {
    validateInputs( {userId, props: {count, offset}}, messagesSchema.getCountOffset)
    return await messages.getSent(userId, {count, offset})
}

exports.get = async (messageId) => {

    validateInputs( {messageId}, messagesSchema.messageId)
    return await messages.get(messageId);
}

exports.delete = async (messageId) => {

    validateInputs( {messageId}, messagesSchema.messageId)
    return await messages.delete(messageId);
}

exports.add = async (senderId, {recipientEmail, subject, message}) => {

    validateInputs( {senderId, props:{recipientEmail, subject, message}}, messagesSchema.add)

    return await messages.add(senderId, {recipientEmail, subject, message});
}

exports.moveToTrash = async (messageId) => {

    validateInputs( {messageId}, messagesSchema.messageId)
    return await messages.moveToTrash(messageId);
}

exports.removeFromTrash = async (messageId) => {

    validateInputs( {messageId}, messagesSchema.messageId)
    return await messages.removeFromTrash(messageId);
}

exports.getInTrash = async (userId, {count, offset} = {}) => {

    validateInputs( {userId, props: {count, offset}}, messagesSchema.getCountOffset)
    return await messages.getInTrash(userId, {count, offset});
}