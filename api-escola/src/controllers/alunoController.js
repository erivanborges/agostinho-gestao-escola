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

exports.create = function (req, res) {
    const novoAluno = new Aluno(req.body);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({error: true, message: 'Favor, informar todos os campos!'});
    } else {
        Aluno.create(novoAluno, function(err, aluno) {
            if (err) {
                res.send(err);
            } else {
                res.json({error: false, massage: 'Aluno salvo com sucesso!', data: aluno});
            }
        });
    }
};