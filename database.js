'use strict';
var mysql=require('mysql');

var db = mysql.createConnection({
    host: "34.70.226.179",
    port: "3306",
    user: "root",
    password: "practicante",
    database:"dbproyecto"
  });

  db.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
  });

module.exports= db;