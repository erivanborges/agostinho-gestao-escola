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

// Lembrar os alunos para exportar em todas as camadas
module.exports = dbConn;