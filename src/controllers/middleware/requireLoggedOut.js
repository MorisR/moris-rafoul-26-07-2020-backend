const send = require("../../util/serverResponse");
const sessions = require("../../util/serverSessions");

module.exports = (req, res, next) => {

    if (!sessions.hasSessionExpired(req))
        return send(res, {message: "user must log out in order to precede", status: 401})

    else next()
}
