const users = require("./query/users")
const messages = require("./query/messages")
const buildDatabase = require("./dbBuild")

module.exports= {query:{users, messages}, buildDatabase};