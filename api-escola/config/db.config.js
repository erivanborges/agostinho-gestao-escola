const mysql = require("mysql2");

const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'dbescola'
});

dbConn.connect(
    function (err) {
        if (err) throw err;
        console.log("Database connected!");
    }
);