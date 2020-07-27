const {Pool}  = require('pg');
const {inProduction}  = require("../../util/envCheck");
require("dotenv").config()


let connectionString = process.env.DB_POSTGRES_URL;
let ssl = process.env.DB_POSTGRES_URL_SSL || ""

if(!inProduction)
{
    connectionString = process.env.DB_POSTGRES_TEST_URL;
    ssl = process.env.DB_POSTGRES_TEST_URL_SSL || "";
}


ssl = ssl.toLowerCase() === "true";


if(!connectionString)
    throw new Error('Env variable DB_URL - DB_TESTING_URL must be set');


module.exports = new Pool({connectionString, ssl })
