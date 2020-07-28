const sessions = require("../../util/serverSessions");

module.exports = (req, res, next) => {

    if (!sessions.hasSessionExpired(req))
        sessions.resetSessionAge(req)

     next()
}
