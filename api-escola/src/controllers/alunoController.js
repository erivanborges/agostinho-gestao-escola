const alunoModel = require('../models/alunoModels');

const getAlunos = (req, res) => {
    const alunos = alunoModel.getAll();
    res.json(alunos);
}

const getAlunosById = (req, res) => {
    const aluno = alunoModel.getById(req.params.id);
    if (!aluno) {
        return req.status(404).json({error: 'Aluno não encontrado!'})
    } else {
        res.json(aluno);
    }

}

const save = (req, res) => {
    const {nome, email} = req.body;

    if(!nome || !email) {
        return res.status(400).json({message: 'Nome e E-mail são obrigatórios'});
    }

    const novoAluno = alunoModel.save({nome, email});

    res.status(201).json(novoAluno);
}

module.exports = {getAlunos, getAlunosById, save};