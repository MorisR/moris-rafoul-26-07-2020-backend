const dbConnection = require("../dbConnection")

exports.getReceived = async (userId, {count, offset} = {}) => {

    return await getMessages(userId, {count, offset, getReceivedMessages: true})

};
exports.getSent = async (userId, {count, offset} = {}) => {

    return await getMessages(userId, {count, offset, getSentMessages: true})

};
exports.get = async (messageId) => {
    if (!messageId)
        throw new Error("messageId must be provided")

    let queryResult = await dbConnection.query(`select *
                                                from messages
                                                where id = $1`, [messageId])


    if (queryResult.rowCount === 0)
        return ;


   return queryResult.rows[0];

};
exports.delete = async (messageId) => {

    if (!messageId)
        throw new Error("user must be provided")

    await dbConnection.query("delete from messages where id=$1",[messageId])
};


exports.moveToTrash = async (messageId) => {

    if (!messageId)
        throw new Error("user must be provided")


    const message = await exports.get(messageId)

    if (message["inTrash"])
        return message;


    const queryResult = await dbConnection.query(`
        update messages
        set "inTrash" = true , "movedToTrashDate" = now()
        where id = $1
        returning *`, [messageId])


    return queryResult.rows[0]

};
exports.removeFromTrash = async (messageId) => {

    if (!messageId)
        throw new Error("user must be provided")


    const queryResult = await dbConnection.query(`
        update messages
        set "inTrash" = false , "movedToTrashDate" = NULL
        where id = $1
        returning *`, [messageId])


    return queryResult.rows[0]

};
exports.getInTrash = async (userId, {count, offset} = {}) => {

    return await getMessages(userId, {count, offset,  getDeletedMessages: true})

};




async function getMessages(userId, {count, offset, getReceivedMessages, getSentMessages, includeInTrash, getInTrashMessages} = {}) {

    if (!userId)
        throw new Error("user id must be provided")

    let query = " select * from messages ";
    let paramPos = 1;

    if (getReceivedMessages || getSentMessages || !includeInTrash)
        query += " where "

    if (getReceivedMessages && getSentMessages)
        query += " ( ";

    if (getReceivedMessages)
        query += ` receiver = $${paramPos} `


    if (getReceivedMessages && getSentMessages)
        query += " or ";

    if (getSentMessages)
        query += ` sender = $${paramPos} `

    if (getReceivedMessages && getSentMessages)
        query += " ) ";

    if (!getInTrashMessages)
        query += `and deleted = $${++paramPos} `

    query += `order by "creationDate" desc `

    if (count !== undefined)
        query += ` limit $${++paramPos} `

    if (offset !== undefined)
        query += ` offset $${++paramPos} `


    const queryResult = await dbConnection.query(query,
        [
            userId,
            includeInTrash ? undefined : getInTrashMessages ? "true" : "false",
            count,
            offset
        ].filter(element => element));


    return queryResult.rows
}
