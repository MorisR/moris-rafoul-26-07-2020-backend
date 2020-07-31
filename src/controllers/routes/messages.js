const send = require("../../util/serverResponse");
const {messages} = require("../../database/modules")

exports.getMessage = async (req, res) => {

    const userId = req.userId;
    const {messageId} = req.params

    try {
        const data = await messages.get(userId, messageId)
        send(res, {data})
    } catch ({message}) {
        send(res, {message, status: 500})
    }

}
exports.addMessage = async (req, res) => {
    const userId = req.userId;
    const {subject, message, recipientEmail} = req.body;

    try {
        const data = await messages.add(userId, {subject, message, recipientEmail})
        send(res, {data,message:"Message sent successfully"})
    } catch ({message}) {
        send(res, {message, status: 500})
    }


}

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
        await messages.delete(userId, messageId)
        send(res, {message: "deleted successfully!"})
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

    if (!["true", "false"].includes(isTrash))
        return send(res, {message: "bad request, incorrect route provided ", status: 400})

    isTrash = isTrash === "true"


    try {
        await messages.setTrashState(userId, messageId, isTrash)
        send(res, {message: isTrash ? "added to trash!" : "removed from trash!"})

    } catch ({message}) {
        send(res, {message, status: 500})
    }

}
exports.setMarkAsRead = async (req, res) => {

    const userId = req.userId;
    let {messageId, isRead} = req.params

    if (!["true", "false"].includes(isRead))
        return send(res, {message: "bad request, incorrect route provided ", status: 400})

    isRead = isRead === "true"


    try {
        await messages.setReadState(userId, messageId, isRead)
        send(res, {message: isRead ? "marked as read!" : "marked as unread!"})

    } catch ({message}) {
        send(res, {message, status: 500})
    }

}
