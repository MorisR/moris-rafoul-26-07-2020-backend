const dbConnection = require("../dbConnection")
const usersQuery = require("./users")
const mergeUsersWithMessageQuery = `
                       (select row_to_json(users) from users where users.id = sender limit 1)   as sender,
                       (select row_to_json(users) from users where users.id = receiver limit 1) as receiver
                       `


exports.getReceived = async (userId, {count, offset} = {}) => {

    return await getMessages(userId, {count, offset, getReceivedMessages: true})

};
exports.getSent = async (userId, {count, offset} = {}) => {

    return await getMessages(userId, {count, offset, getSentMessages: true})

};
exports.get = async (messageId) => {
    if (!messageId)
        throw new Error("messageId must be provided")

    let queryResult = await dbConnection.query(`
                select *, ${mergeUsersWithMessageQuery}
                from messages
                where id = $1
        `
        , [messageId])


    if (queryResult.rowCount === 0)
        return;


    return queryResult.rows[0];

};
exports.delete = async (messageId) => {

    if (!messageId)
        throw new Error("user must be provided")

    await dbConnection.query("delete from messages where id=$1", [messageId])
};
exports.add = async (senderId, {recipientEmail, subject, message}) => {

    const senderData = await usersQuery.get({userId: senderId})
    if (!senderData)
        throw new Error("sender not found")


    const recipientData = await usersQuery.get({email: recipientEmail})
    if (!recipientData)
        throw new Error("receiver not found")


    const queryResult = await dbConnection.query(`
        insert into messages (sender, receiver, subject, message)
        values ($1, $2, $3, $4)
        returning *`, [senderId, recipientData.id, subject, message])


    if (queryResult.rowCount === 0)
        throw new Error("something went wrong")


    return queryResult.rows[0];

}

exports.moveToTrash = async (messageId) => {

    if (!messageId)
        throw new Error("user must be provided")


    const message = await exports.get(messageId)

    if (message["inTrash"])
        return message;


    const queryResult = await dbConnection.query(`
        update messages
        set "inTrash"          = true,
            "movedToTrashDate" = now()
        where id = $1
        returning *, ${mergeUsersWithMessageQuery}
    `, [messageId])

    if (queryResult.rowCount)
        return queryResult.rows[0]

};
exports.removeFromTrash = async (messageId) => {

    if (!messageId)
        throw new Error("user must be provided")


    const queryResult = await dbConnection.query(`
        update messages
        set "inTrash"          = false,
            "movedToTrashDate" = NULL
        where id = $1
        returning *, ${mergeUsersWithMessageQuery}`, [messageId])

    if (queryResult.rowCount)
        return queryResult.rows[0]

};
exports.getInTrash = async (userId, {count, offset} = {}) => {

    return await getMessages(userId, {count, offset, getDeletedMessages: true})

};


async function getMessages(userId, {count, offset, getReceivedMessages, getSentMessages, includeInTrash, getInTrashMessages} = {}) {

    if (!userId)
        throw new Error("user id must be provided")

    let query = ` select *,${mergeUsersWithMessageQuery}
                  from messages `;


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

    /*
    example:
         select *,
          (select json_agg(row_to_json(users)) from users where users.id = sender)   as sender,
          (select json_agg(row_to_json(users)) from users where users.id = receiver) as receiver
         from messages
         where "inTrash" = true and (receiver = id or sender = id )       <-- this changes based on the function arguments
         order by "creationDate"
         limit 3      <-- this part is optional
         offset 3     <-- this part is optional
     */
    const queryResult = await dbConnection.query(query,
        [
            userId,
            includeInTrash ? undefined : getInTrashMessages ? "true" : "false",
            count,
            offset
        ].filter(element => element));


    return queryResult.rows
}
