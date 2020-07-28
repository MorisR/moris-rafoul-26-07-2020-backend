const {users: usersModule} = require("../../database/modules")
const send = require("../../util/serverResponse");
const sessions = require("../../util/serverSessions");
const hashPassword = require("../../util/hashPassword");

exports.login = async (req, res) => {

    const {email, password} = req.body;

    try {
        const userData = await usersModule.validateCredentials(email, password)
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
        password = await hashPassword(password)
        const userData = await usersModule.add({email, password, firstName, lastName})
        sessions.createSession(req, {userId: userData.id})
        send(res, {message: "logged in successfully!"})

    } catch ({message}) {
        send(res, {message, status: 401})
    }

}