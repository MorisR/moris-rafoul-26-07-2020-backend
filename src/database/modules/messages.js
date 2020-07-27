const {query: {messages}} = require("../postgres")
const {validateInputs,messagesSchema} = require("../../util/inputValidators");



exports.getReceived = async (userId, {count, offset} = {}) => {

    validateInputs( {userId, props: {count, offset}}, messagesSchema.messageId_count_offset)
    return await messages.getReceived(userId, {count, offset});
}

exports.getSent = async (userId, {count, offset} = {}) => {
    validateInputs( {userId, props: {count, offset}}, messagesSchema.messageId_count_offset)
    return await messages.getSent(userId, {count, offset})
}

exports.get = async (userId, messageId) => {

    validateInputs( {userId, messageId}, messagesSchema.userId_messageId)
    return await messages.get(userId, messageId);
}

exports.delete = async (userId,messageId) => {

    validateInputs({userId, messageId}, messagesSchema.userId_messageId)
    return await messages.delete(userId, messageId);
}

exports.add = async (senderId, {recipientEmail, subject, message}) => {

    validateInputs( {senderId,recipientEmail, subject, message}, messagesSchema.add)

    return await messages.add(senderId, {recipientEmail, subject, message});
}

exports.moveToTrash = async (userId,messageId) => {

    validateInputs( {userId,messageId}, messagesSchema.userId_messageId)
    return await messages.moveToTrash(userId,messageId);
}

exports.removeFromTrash = async (userId,messageId) => {

    validateInputs( {userId,messageId}, messagesSchema.userId_messageId)
    return await messages.removeFromTrash(userId,messageId);
}

exports.getInTrash = async (userId, {count, offset} = {}) => {

    validateInputs( {userId, props: {count, offset}}, messagesSchema.messageId_count_offset)
    return await messages.getInTrash(userId, {count, offset});
}