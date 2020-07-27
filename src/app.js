//express dependencies
const express = require("express")
const favicon = require('serve-favicon');
const helmet = require("helmet")
const app = express()
const router = require("./controllers/router")

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(helmet())
app.disable('x-powered-by');


app.use(router)



module.exports = app;