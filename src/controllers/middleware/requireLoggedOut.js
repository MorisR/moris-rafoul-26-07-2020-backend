const send = require("../../util/serverResponse");
const sessions = require("../../util/serverSessions");

module.exports = (req, res, next) => {

    if (!sessions.hasSessionExpired(req))
        return send(res, {message: "cannot access route while user logged in", status: 401})

    else next()
}
