const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');

// Retorna todos os alunos
router.get('/', alunoController.findAll);

//router.get('/:id', alunoController.getAlunosById);
//router.post('/', alunoController.save);

module.exports = router;