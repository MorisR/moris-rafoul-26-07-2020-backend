const sessions = require("../../util/serverSessions");

module.exports = (req, res, next) => {

    if (!sessions.hasSessionExpired(req))
        req.userId = sessions.getSession(req).userId
    else if(sessions.getSession(req).userId !== undefined)
        sessions.clearSession(req)

    next()
}
