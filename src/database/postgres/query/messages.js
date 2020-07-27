const dbConnection = require("../dbConnection")
const usersQuery = require("./users")
const mergeUsersWithMessageQuery = `
        (select json_build_object('id',id,'email', email,'firstName',"firstName",'lastName',"lastName")from users where users.id = receiver limit 1)   as receiver,
       (select json_build_object('id',id,'email', email,'firstName',"firstName",'lastName',"lastName")from users where users.id = sender limit 1)   as sender
                       `


exports.getReceived = async (userId, {count, offset} = {}) => {

    return await getMessages(userId, {count, offset, messagesType: "received"})

};
exports.getSent = async (userId, {count, offset} = {}) => {

    return await getMessages(userId, {count, offset, messagesType: "sent"})

};
exports.get = async (userId,messageId) => {


  let queryResult = await getMessages(userId, { messagesType:"messageId", messageId})

    if (queryResult.length === 0)
        return;

    return queryResult[0];

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
        returning *, ${mergeUsersWithMessageQuery}`, [senderId, recipientData.id, subject, message])


    if (queryResult.rowCount === 0)
        throw new Error("something went wrong")


    return queryResult.rows[0];

}

exports.moveToTrash = async (userId, messageId) => {

    return await setMessageSettingsForUser(userId, messageId, {inTrash: true})
};
exports.removeFromTrash = async (userId, messageId) => {

    return await setMessageSettingsForUser(userId, messageId, {inTrash: false})
};
exports.getInTrash = async (userId, {count, offset} = {}) => {

    return await getMessages(userId, {count, offset, messagesType: "trash"})
};
exports.delete = async (userId, messageId) => {

    return await setMessageSettingsForUser(userId, messageId, {isDeleted: true})

};

async function getMessages(userId, {count, offset, messagesType, messageId} = {}) {


    let filterQuery = ""
    switch (messagesType) {
        case "sent":
            filterQuery += `and sender = $1 `
            break;
        case "received":
            filterQuery += `and receiver = $1 `
            break;
        case "trash":
            filterQuery += `and (receiver = $1 or sender = $1)
                            and  mS."inTrash" = true`
            break;
        case "messageId":
            filterQuery += `messages.id = ${Number(messageId)}`
    }


    let query = `
        select messages.id, subject, message, "creationDate", ${mergeUsersWithMessageQuery}
        from messages
                 full outer join "messagesSettings" mS on
                (mS."userId" = messages.receiver or mS."userId" = messages.sender)
                and mS."messageId" = messages.id


        --where  message attached to user settings - or not
        where (mS.id is null or mS."userId" = $1)
       
        -- where message not marked as deleted
          and (not mS."deleted" or mS.id is null)
        
         ${filterQuery}
        
        order by "creationDate" desc

        limit $2 offset $3 `;


    const queryResult = await dbConnection.query(query, [userId, count, offset]);


    return queryResult.rows
}
async function setMessageSettingsForUser(userId, messageId, {isDeleted, inTrash}) {


    const messageData = await exports.get(messageId)


    if (![messageData.sender, messageData.receiver].includes(userId.toString()))
        throw new Error("user is not related to the message")


    const {rows: userSettingsForMessage} = await dbConnection.query(
            `select *
             from "messagesSettings"
             where "userId" = $1
               and "messageId" = $2`, [userId, messageId])


    if (userSettingsForMessage.length === 0)
        await dbConnection.query(` INSERT INTO "messagesSettings" ("userId", "messageId", "inTrash", deleted, "addedToTrashDate")
                                   VALUES ($1, $2, $3, $4, $5) `, [messageId, userId, messageId, inTrash, isDeleted, inTrash ? "now()" : ""])


    else
        await dbConnection.query(` update "messagesSettings"
                                   set ("userId", "messageId", "inTrash", deleted, "addedToTrashDate")
                                           = ($1, $2, $3, $4, $5) `, [messageId, userId, messageId, inTrash, isDeleted, inTrash ? "now()" : ""])


}
