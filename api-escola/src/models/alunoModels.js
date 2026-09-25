var dbConn = require('../../config/db.config.js');

var Aluno = function (aluno) {

    this.id_aluno = aluno.id_aluno;
    this.nome_aluno = aluno.nome_aluno;
    this.cpf = aluno.cpf;
    this.data_nascimento = aluno.data_nascimento;
    this.email = aluno.email;
    this.endereco = aluno.endereco;

};

// FIND ALL
Aluno.findAll = function (result) {
    const sql = `SELECT a.* FROM aluno a`;
    dbConn.query(sql, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

module.exports = Aluno;