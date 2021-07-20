const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "education",
    port: 8889,
  },
  pool: {
    min: 0,
    max: 50,
  },
});

//connection: {
//  host: "us-cdbr-east-04.cleardb.com",
//  user: "b24e3594d725bb",
//  password: "fdad89a8",
//  database: "heroku_112bc1e92b24ce0",
//  port: 3306,
//},

module.exports = knex;
