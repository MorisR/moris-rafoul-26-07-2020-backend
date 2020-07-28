const moment = require("moment")


exports.createSession = (req, toStoreInCookie = {}) => {
    const sessionExpDate = generateSessionExpDate()
    req.session = {
        ...req.session,
        ...toStoreInCookie,
        expDate: sessionExpDate,
        creationTime: generateNowInMilliseconds()
    }
    req.sessionOptions.maxAge = sessionExpDate

}

exports.clearSession = (req) => {
    req.session = null
}

exports.resetSessionAge = (req) => {
    req.session.creationTime = generateNowInMilliseconds()
    req.sessionOptions.maxAge = generateSessionExpDate()

}

exports.getSession = (req) => req.session;

exports.hasSessionExpired = (req) => {
    if (!req.session.expDate || !req.session.creationTime)
        return true;

    const sessionCreationDate = moment.duration(req.session.creationTime, "millisecond")
    sessionCreationDate.add(req.session.expDate,"millisecond")

    return sessionCreationDate.isBefore(moment.now())

}

let sessionAgeInSeconds = process.env.SESSION_AGE_SECONDS
if (!sessionAgeInSeconds)
    throw new Error("SESSION_AGE_SECONDS must be set as an environment variable")
sessionAgeInSeconds = parseInt(sessionAgeInSeconds)


function generateSessionExpDate() {
    return moment.duration(sessionAgeInSeconds, "seconds").asMilliseconds()
}
function generateNowInMilliseconds() {
    return moment.duration(moment.now()).asMilliseconds()
}


