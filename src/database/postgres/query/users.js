const dbConnection = require("../dbConnection")


exports.get = async ({userId, email} = {}) => {

    const queryResult = await dbConnection.query(`
        select * from users 
        where ${userId ? "id = $1" : ""} 
        ${userId && email ? "and" : ""}
        ${email ? `email = ${userId ? "$2" : "$1"}` : ""} 
`, [userId, email].filter(element => element));


    if (queryResult.rowCount)
        if (queryResult.rows[0]["isDeleted"] === false)
            return queryResult.rows[0]

};
exports.delete = async (userId) => {

    const queryResult = await dbConnection.query(`
        update users
        set "firstName" = '[Account Deleted]',
            "lastName"  = '',
            email       = '',
            password    = '',
            "isDeleted"= true
        where id = $1
        returning *
    `, [userId])


    if (queryResult.rowCount === 0)
        throw new Error("user not found");

}
exports.update = async (userId, fieldsToUpdate={}) => {
    /// fieldsToUpdate = {password,firstName,lastName}

    if (Object.keys(fieldsToUpdate).length === 0)
        return await exports.get({userId});


    const fieldsToUpdateKeys = Object.keys(fieldsToUpdate)
    const fieldsToUpdateQuery = fieldsToUpdateKeys.map((key, index) => ` "${key}" = $${index + 2}`).join(",") // name=$2 , lastName=$3 , etc...
    const fieldsToUpdateValues = fieldsToUpdateKeys.map(key => fieldsToUpdate[key])


    const queryResult = await dbConnection.query(`
        UPDATE users SET ${fieldsToUpdateQuery}
        where id = $1
        returning *
    `, [userId, ...fieldsToUpdateValues])


    if (queryResult.rows.length === 0)
        throw new Error("user not found");


    return queryResult.rows[0]
}
exports.add = async ({email, password, firstName, lastName} = {}) => {

    const existingUser = await exports.get({email})
    if (existingUser)
        throw new Error("email already in use")


    const queryResult = await dbConnection.query(`
        insert into users ("firstName", "lastName", email, password)
        values ($1, $2, $3, $4)
        returning *
    `, [email, password, firstName, lastName].filter(x => x))


    return queryResult.rows[0]
}

