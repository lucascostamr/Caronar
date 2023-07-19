const mysql = require("mysql2");

const con = mysql.createConnection({
    host: "172.17.0.2",
    user: "root",
    password: "1234"
})

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = con;