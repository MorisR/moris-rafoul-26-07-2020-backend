const moment = require("moment")
const {getAndRequireEnvVar} = require("./envCheck")
var jwt = require('jsonwebtoken');
const sessionSecret = getAndRequireEnvVar("COOKIE_SESSION_SECRET");


exports.createSession = (res, toStoreInCookie = {}) => {
    const sessionExpDate = generateSessionExpDate()
    const sessionData = {
        ...toStoreInCookie,
        expDate: sessionExpDate,
        creationTime: generateNowInMilliseconds()
    }
    const signed = jwt.sign(sessionData, sessionSecret);
    res.cookie("session", signed , {maxAge : sessionExpDate});
}

exports.clearSession = (req, res) => {
    res.cookie("session", {} , {maxAge : 1});

}

exports.resetSessionAge = (req,res) => {
    const sessionData = exports.getSession(req);
    if(!sessionData)
        return;
    exports.createSession(res,sessionData)

}

exports.getSession = (req) => {

    try {

        return jwt.verify(req.cookies.session, sessionSecret)
    } catch(err) {
        return {}
    }

}

exports.hasSessionExpired = (req) => {

    const cookieData = exports.getSession(req)
    if (!cookieData.creationTime)
        return true;

    const sessionCreationDate = moment(cookieData.creationTime)
    sessionCreationDate.add(cookieData.expDate, "millisecond")

    return sessionCreationDate.isBefore(moment())

}


let sessionAgeInSeconds = getAndRequireEnvVar("SESSION_AGE_SECONDS")
sessionAgeInSeconds = parseInt(sessionAgeInSeconds)


function generateSessionExpDate() {
    return moment.duration(sessionAgeInSeconds, "seconds").asMilliseconds()
}

function generateNowInMilliseconds() {
    return moment.duration(moment.now()).asMilliseconds()
}


