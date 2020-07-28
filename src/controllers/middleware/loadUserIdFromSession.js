const sessions = require("../../util/serverSessions");

module.exports = (req, res, next) => {

    if (!sessions.hasSessionExpired(req))
        req.userId = sessions.getSession(req).userId

    next()
}
