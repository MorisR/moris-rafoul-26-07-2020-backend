const dbConnection = require("../dbConnection")
const usersQuery = require("./users")


const messageQueryToReturn = `messages.id, subject, message, "creationDate",
        (select json_agg(row_to_json("messagesSettings")) -> 0 from "messagesSettings" where "messageId" = messages.id and "userId" = $1  limit 1) as "messageSettings",
        (select json_build_object('id',id,'email', email,'firstName',"firstName",'lastName',"lastName")from users where users.id = receiver limit 1)   as receiver,
        (select json_build_object('id',id,'email', email,'firstName',"firstName",'lastName',"lastName")from users where users.id = sender limit 1)   as sender
                       `


exports.getReceived = async (userId, {count, offset} = {}) => {

    return await getMessages(userId, {count, offset, messagesType: "received"})

};
exports.getSent = async (userId, {count, offset} = {}) => {

    return await getMessages(userId, {count, offset, messagesType: "sent"})

};
exports.getInTrash = async (userId, {count, offset} = {}) => {

    return await getMessages(userId, {count, offset, messagesType: "trash"})
};


exports.setTrashState = async (userId, messageId,isTrash) => {

    await updateUserMessageSettingsFields(userId, messageId, {inTrash: isTrash, addedToTrashDate: new Date()})
};
exports.setReadState = async (userId, messageId,isRead) => {

    await updateUserMessageSettingsFields(userId, messageId, {read: isRead, readDate: new Date()})
};

exports.delete = async (userId, messageId) => {

    await updateUserMessageSettingsFields(userId, messageId, {isDeleted: true})
};


exports.get = async (userId, messageId) => {
    await checkIfMessageExists(userId, messageId);
    await checkIfUserRelatedToMessage(userId, messageId);
    return await getMessageInfo(userId, messageId);
}
exports.add = async (senderId, {recipientEmail, subject, message}) => {

    const senderData = await usersQuery.get({userId: senderId})
    if (!senderData)
        throw new Error("sender not found")


    const recipientData = await usersQuery.get({email: recipientEmail})
    if (!recipientData || recipientData.isDeleted)
        throw new Error("recipient not found")


    const queryResult = await dbConnection.query(`
        insert into messages (sender, receiver, subject, message)
        values ($1, $2, $3, $4)
        returning ${messageQueryToReturn}`, [senderId, recipientData.id, subject, message])


    if (queryResult.rowCount === 0)
        throw new Error("something went wrong")


    return queryResult.rows[0];

}


async function getMessages(userId, {count, offset, messagesType, messageId} = {}) {


    let filterQuery = ""
    switch (messagesType) {
        case "sent":
            filterQuery += `and sender = $1 and (not mS."inTrash" or mS.id is null)`
            break;
        case "received":
            filterQuery += `and receiver = $1 and (not mS."inTrash" or mS.id is null)`
            break;
        case "trash":
            filterQuery += `and (receiver = $1 or sender = $1) and  mS."inTrash" = true`
            break;
        case "messageId":
            filterQuery += `and messages.id = ${Number(messageId)}`
    }


    let query = `
        select ${messageQueryToReturn}  from messages
         full outer join "messagesSettings" mS on
            (mS."userId" = messages.receiver or mS."userId" = messages.sender)
            and mS."messageId" = messages.id


        --where user has message settings or user didn't modify the message settings at all
        where (mS.id is null or mS."userId" = $1)
       
        -- where message is not marked as deleted
          and (not mS."deleted" or mS.id is null)
            
         ${filterQuery}
        
        order by "creationDate" desc

        limit $2 offset $3 `;


    const queryResult = await dbConnection.query(query, [userId, count, offset]);


    return queryResult.rows
}
async function updateUserMessageSettingsFields(userId, messageId, fields) {

    await checkIfMessageExists(userId, messageId)
    await checkIfUserRelatedToMessage(userId, messageId)

    let userMessageSettings = await getUserMessageSettings(userId, messageId)

    if (!userMessageSettings)
        userMessageSettings = await addUserMessageSettings(userId, messageId)

    await updateUserMessageSettings(userMessageSettings.id, fields)
}


async function getUserMessageSettings(userId, messageId) {

    const queryResult = await dbConnection.query(`select * from "messagesSettings"
             where "userId" = $1 and "messageId" = $2`, [userId, messageId])

    if (queryResult.rowCount !== 0)
        return queryResult.rows[0];

}
async function addUserMessageSettings(userId, messageId) {

    const queryResult = await dbConnection.query(` INSERT INTO "messagesSettings" ("userId", "messageId")
                                                   VALUES ($1, $2)
                                                   returning *`, [userId, messageId])

    return queryResult.rows[0]
}
async function updateUserMessageSettings(messageSettingsId, fields = {}) {

    const fieldNames = Object.keys(fields)
    const fieldValues = fieldNames.map(key => fields[key])
    const insertFieldsQuery = fieldNames.map((key, index) => `"${key}" = $${index + 2}`).join(" , ")


    if (fieldNames.length === 0)
        return;


    await dbConnection.query(` update "messagesSettings" set ${insertFieldsQuery} 
                              where id = $1 `, [messageSettingsId, ...fieldValues])

}


async function getMessageInfo(userId, messageId) {

    let queryResult = await getMessages(userId, {messagesType: "messageId", messageId})

    if (queryResult.length === 0)
        return;

    return queryResult[0];

}
async function checkIfMessageExists(userId, messageId) {
    const messageData = await getMessageInfo(userId, messageId)
    if (!messageData)
        throw new Error("message does not exist or might have been deleted")
}
async function checkIfUserRelatedToMessage(userId, messageId) {
    const messageData = await getMessageInfo(userId, messageId)
    if (![messageData.sender.id, messageData.receiver.id].includes(userId))
        throw new Error("user is not related to the message")

}

