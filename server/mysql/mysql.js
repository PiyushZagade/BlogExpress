const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Pass@123",
  database: "blogs",
});

module.exports = pool;
