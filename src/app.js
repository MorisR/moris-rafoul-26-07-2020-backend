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

app.use(cors)
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(helmet())
app.disable('x-powered-by');
app.use(serveFavicon(path.join(__dirname,"..","public","favicon.png")))

const sessionSecret = getAndRequireEnvVar("COOKIE_SESSION_SECRET");
app.use(cookieSession({
    name: 'session',
    secret:sessionSecret,
}))


app.get("/",(req,res)=>
    res.send(`<h1>welcome to the backend!😊😎</h1>
              <h3>more info on how to use the api could be found <a href='https://github.com/MorisR/moris-rafoul-26-07-2020-backend'>here</a>!</h3>`))


app.use(router)


module.exports = app;