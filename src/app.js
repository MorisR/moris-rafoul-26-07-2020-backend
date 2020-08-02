//express dependencies
const express = require("express")
const serveFavicon = require('serve-favicon');
const path = require('path');
const helmet = require("helmet")
const cookieParser = require("cookie-parser")
const cookieSession = require('cookie-session')
const cors = require('cors')
const app = express()
const router = require("./controllers/router")
const {getAndRequireEnvVar} = require("./util/envCheck")

//setup cors
app.use(cors({
    origin: [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1",
        "https://herolo-messaging-app-frontend.herokuapp.com",
        "https://moris-rafoul-26-07-2020.netlify.app",
    ],
    credentials: true,
    exposedHeaders: ["set-cookie"],
}))


app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(helmet())
app.disable('x-powered-by');
app.use(serveFavicon(path.join(__dirname,"..","public","favicon.png")))


//setup cookie sessions
const sessionSecret = getAndRequireEnvVar("COOKIE_SESSION_SECRET");
app.use(cookieSession({
    name: 'session',
    secret:sessionSecret,
    secure:true
}))



app.use(router)


module.exports = app;