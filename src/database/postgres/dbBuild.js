const fs = require('fs');
const path = require('path');
const dbConnection = require('./dbConnection.js');



const sqlCommandsPath = path.join(__dirname, 'sqlCommands');

const filesInDirectory  = fs.readdirSync(sqlCommandsPath)
const sqlFilesInDirectory =  filesInDirectory.filter(x=> /.*\.sql$/.test(x))
const filePaths =  sqlFilesInDirectory.map(fileName=>path.join(sqlCommandsPath, fileName))
const filesContent = filePaths.map(path=> fs.readFileSync(path).toString()).join("\n")


const runDbBuild = async cb => await dbConnection.query(filesContent, cb)


module.exports = runDbBuild;