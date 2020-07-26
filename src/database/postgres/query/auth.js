const connection = require("../dbConnection")


exports.get = async ({userId, email = ""}) => {

    if (!email && !userId)
        throw new Error("user id or email address must be provided")


    const queryResult = await connection.query(`
        select * from users 
        where ${userId ? "id = $1" : ""} 
        ${userId && email ? "and" : ""}
        ${email ? `email = ${userId ? "$2" : "$1"}` : ""} 
`, [userId, email].filter(element => element));


    if (queryResult.rows.length)
        return queryResult.rows[0]

};


exports.delete = async (userId) => {

    if (!userId)
        throw new Error("user id must be provided")


    const queryResult = await connection.query(`
        delete
        from users
        where id = $1
        returning *
    `, [userId])


    if (!queryResult.rows.length)
        throw new Error("user not found");

}


exports.update = async (userId, fieldsToUpdate ) => {


    if (!userId)
        throw new Error("user id must be provided")


    if (Object.keys(fieldsToUpdate).length === 0)
        return exports.get(userId);



    const fieldsToUpdateKeys =  Object.keys(fieldsToUpdate)
    const fieldsToUpdateQuery =fieldsToUpdateKeys.map((key,index)=>` "${key}" = $${index+2}`).join(",") // name=$2 , lastName=$3 , etc...
    const fieldsToUpdateValues = fieldsToUpdateKeys.map(key=>fieldsToUpdate[key])


    const queryResult = await connection.query(`
        UPDATE users SET ${fieldsToUpdateQuery}
        where id = $1
        returning *
    `, [userId,...fieldsToUpdateValues])



    if (queryResult.rows.length === 0)
        throw new Error("user not found");


    return queryResult.rows[0]
}


exports.add = async ({email, password, firstName, lastName}) => {


    if (!email || !password || !firstName || !lastName)
        throw new Error("not all arguments were provided")


    const existingUser = await exports.get({email})
    if (existingUser)
        throw new Error("email already in use")


    const queryResult = await connection.query(`
        insert into users ("firstName", "lastName", email, password)
        values ($1, $2, $3, $4)
        returning *
    `, [email, password, firstName, lastName].filter(x => x))


    return queryResult.rows[0]
}

