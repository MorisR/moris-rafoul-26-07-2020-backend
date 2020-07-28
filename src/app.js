//express dependencies
const express = require("express")
const favicon = require('serve-favicon');
const helmet = require("helmet")
const cookieParser = require("cookie-parser")
const cookieSession = require('cookie-session')
const app = express()
const router = require("./controllers/router")
const {getAndRequireEnvVar} = require("./util/envCheck")

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(helmet())
app.disable('x-powered-by');


const sessionSecret = getAndRequireEnvVar("COOKIE_SESSION_SECRET");
app.use(cookieSession({
    name: 'session',
    secret:sessionSecret,
}))




app.use(router)



module.exports = app;