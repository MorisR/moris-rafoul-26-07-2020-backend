const {users: usersModule} = require("../../database/modules")
const {send} = require("../../util/serverResponse");
const sessions = require("../../util/serverSessions");

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
exports.getCurrentUserData = async (req, res) => {

    const userId = sessions.getSession(req).userId

    try {
        const userData =await usersModule.get({userId})
        send(res, {data:userData})

    } catch ({message}) {
        send(res, {message, status: 401})
    }

}
exports.logout =  async (req, res) =>{
    sessions.clearSession(req);
    send(res, {message:"logged out successfully!"})
}