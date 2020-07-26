const {Pool}  = require('pg');
const {isInProduction}  = require("../../util/envCheck");
require("dotenv").config()


let connectionString = process.env.DB_URL;


if(process.env.NODE_ENV !== "production")
    connectionString = process.env.DB_TESTING_URL;

if(!connectionString)
    throw new Error('Env variable DB_URL - DB_TESTING_URL must be set');



module.exports = new Pool({
    connectionString: connectionString,
    ssl: isInProduction()

})
