const fs = require('fs');
const path = require('path');
const dbConnection = require('./dbConnection.js');



let sqlCommandsPath = path.join(__dirname, 'sqlCommands');


let sqlQuery = fs.readdirSync(sqlCommandsPath)
    .filter(x=> /.*\.sql$/.test(x)) //ends with .sql
    .map(fileName=>path.join(sqlCommandsPath, fileName)) //select all paths
    .map(path=> fs.readFileSync(path).toString())  // read the files
    .join("\n") // convert them to a single sql string

console.log(sqlQuery)

const runDbBuild = async cb => await dbConnection.query(sqlQuery, cb)


module.exports = runDbBuild;