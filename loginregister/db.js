'use strict'

const mysql = require("mysql");
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "penduduk",
    multipleStatements: true,
})

module.exports = db;