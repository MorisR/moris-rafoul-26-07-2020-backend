const {send} = require("../../util/serverResponse");
const {messages} = require("../../database/modules")

exports.getReceived = async (req, res) => {

    const userId = req.userId;
    const {count,offset} = req.query

    try {
       const data = await messages.getReceived(userId,{count,offset})
        send(res,{data})
    }
    catch ({message}) {
        send(res,{message,status:500})
    }

}

exports.getSent= async (req, res) => {

    const userId = req.userId;
    const {count,offset} = req.query

    try {
        const data = await messages.getSent(userId,{count,offset})
        send(res,{data})
    }
    catch ({message}) {
        send(res,{message,status:500})
    }

}

exports.getInTrash= async (req, res) => {

    const userId = req.userId;
    const {count,offset} = req.query

    try {
        const data = await messages.getInTrash(userId,{count,offset})
        send(res,{data})
    }
    catch ({message}) {
        send(res,{message,status:500})
    }

}