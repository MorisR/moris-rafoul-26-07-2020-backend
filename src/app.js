//express dependencies
const express = require("express")
const favicon = require('serve-favicon');
const helmet = require("helmet")
const cookieParser = require("cookie-parser")
const cookieSession = require('cookie-session')
const app = express()
const router = require("./controllers/router")

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(helmet())
app.disable('x-powered-by');


const sessionSecret = process.env.COOKIE_SESSION_SECRET;
if(!sessionSecret)
    throw new Error("COOKIE_SESSION_SECRET must be set as an environment variable")
app.use(cookieSession({
    name: 'session',
    secret:sessionSecret,
}))


app.use(router)



module.exports = app;