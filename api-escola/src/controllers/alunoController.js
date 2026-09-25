const Aluno = require('../models/alunoModels');

exports.findAll = function (req, res) {
	//console.log("Testando findALL");
    Aluno.findAll(function (err, alunos) {
        //console.log('controller')
        if (err)
            res.send(err);
        console.log('res', alunos);
        res.send(alunos);
    });
};