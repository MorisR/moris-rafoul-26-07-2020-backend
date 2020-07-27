const {send} = require("../../util/serverResponse");
const {messages} = require("../../database/modules")

exports.getReceived = async (req, res) => {

    const userId = req.userId;
    const {count, offset} = req.query

    try {
        const data = await messages.getReceived(userId, {count, offset})
        send(res, {data})
    } catch ({message}) {
        send(res, {message, status: 500})
    }

}

exports.getSent = async (req, res) => {

    const userId = req.userId;
    const {count, offset} = req.query

    try {
        const data = await messages.getSent(userId, {count, offset})
        send(res, {data})
    } catch ({message}) {
        send(res, {message, status: 500})
    }

}

exports.deleteMessage = async (req, res) => {

    const userId = req.userId;
    const {messageId} = req.params

    try {
        const data = await messages.delete(userId, messageId)
        send(res, {data})
    } catch ({message}) {
        send(res, {message, status: 500})
    }

}

exports.getInTrash = async (req, res) => {

    const userId = req.userId;
    const {count, offset} = req.query

    try {
        const data = await messages.getInTrash(userId, {count, offset})
        send(res, {data})
    } catch ({message}) {
        send(res, {message, status: 500})
    }

}

exports.setTrashState = async (req, res) => {

    const userId = req.userId;
    let {messageId, isTrash} = req.params

    if(!["true","false"].includes(isTrash))
        return send(res, {message:"bad request, incorrect route provided ", status: 400})

    isTrash = isTrash === "true"


    try {
        if (isTrash)
            await messages.moveToTrash(userId, messageId)
        else
            await messages.removeFromTrash(userId, messageId)

        send(res, {message: isTrash?"added to trash":"removed from trash"})

    } catch ({message}) {
        send(res, {message, status: 500})
    }

}
