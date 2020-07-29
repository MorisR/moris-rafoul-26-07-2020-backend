const {users: usersModule} = require("../../database/modules")
const send = require("../../util/serverResponse");
const sessions = require("../../util/serverSessions");
const hashing = require("../../util/hashPassword");

exports.login = async (req, res) => {

    let {email, password} = req.body;

    try
    {
        await usersModule.validateCredentials(email, password,hashing.compare)
        const userData = await usersModule.get({email})
        sessions.createSession(req, {userId: userData.id})
        send(res, {message: "logged in successfully!"})

    } catch ({message}) {
        send(res, {message, status: 401})
    }

}
exports.logout = async (req, res) => {
    sessions.clearSession(req);
    send(res, {message: "logged out successfully!"})
}
exports.getCurrentUserData = async (req, res) => {

    const userId = req.userId

    try {
        const userData = await usersModule.get({userId})
        send(res, {data: userData})

    } catch ({message}) {
        send(res, {message, status: 401})
    }

}
exports.register = async (req, res) => {

    let  {email, password, firstName, lastName} = req.body;

    try {
        await usersModule.validateRegisterCredentials({email, password, firstName, lastName})
        password = await hashing.hash(password)
        await usersModule.add({email, password, firstName, lastName})
        send(res, {message: "account created successfully!"})

    } catch ({message}) {
        send(res, {message, status: 401})
    }

}
exports.deleteAccount = async (req,res)=>{

    const userId = req.userId

    try {
        await usersModule.delete(userId)
        sessions.clearSession(req);
        send(res, {message: "account deleted successfully!"})

    } catch ({message}) {
        send(res, {message, status: 401})
    }

}